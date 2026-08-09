type FetchLike = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

interface HandlerDependencies {
  apiKey?: string;
  fetchOpenAI: FetchLike;
  model?: string;
}

interface ShoppingItemsResponse {
  items: Array<{ name: string; quantity: string | null }>;
}

const validateModelOutput = (value: unknown): ShoppingItemsResponse | null => {
  if (!value || typeof value !== "object" || !("items" in value)) return null;
  const { items } = value as { items: unknown };
  if (!Array.isArray(items) || items.length > 50) return null;

  const normalizedItems: ShoppingItemsResponse["items"] = [];
  for (const item of items) {
    if (!item || typeof item !== "object") return null;
    const { name, quantity } = item as { name?: unknown; quantity?: unknown };
    if (typeof name !== "string" || !name.trim() || name.trim().length > 100) {
      return null;
    }
    if (quantity !== null && typeof quantity !== "string") return null;
    if (typeof quantity === "string" && quantity.trim().length > 40)
      return null;
    normalizedItems.push({
      name: name.trim(),
      quantity: typeof quantity === "string" ? quantity.trim() || null : null,
    });
  }

  return { items: normalizedItems };
};

const hasExpectedImageSignature = (image: string): boolean => {
  const match = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(
    image,
  );
  if (!match) return false;

  try {
    const bytes = Uint8Array.from(atob(match[2].slice(0, 24)), (character) =>
      character.charCodeAt(0),
    );
    if (match[1] === "jpeg") {
      return (
        bytes.length >= 3 &&
        bytes[0] === 0xff &&
        bytes[1] === 0xd8 &&
        bytes[2] === 0xff
      );
    }
    if (match[1] === "png") {
      const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
      return signature.every((byte, index) => bytes[index] === byte);
    }
    return (
      bytes.length >= 12 &&
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    );
  } catch {
    return false;
  }
};

export const createAnalyzeShoppingImageHandler =
  ({ apiKey, fetchOpenAI, model = "gpt-4.1-mini" }: HandlerDependencies) =>
  async (request: Request): Promise<Response> => {
    if (request.method !== "POST") {
      return Response.json(
        { error: "Method not allowed." },
        { status: 405, headers: { Allow: "POST" } },
      );
    }

    if (!apiKey) {
      return Response.json(
        { error: "Image analysis is not configured yet." },
        { status: 503 },
      );
    }

    let parsedBody: unknown;
    try {
      parsedBody = await request.json();
    } catch {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }
    if (
      !parsedBody ||
      typeof parsedBody !== "object" ||
      Array.isArray(parsedBody)
    ) {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }

    const requestBody = parsedBody as { image?: unknown; language?: unknown };
    const image = requestBody.image;
    const language =
      typeof requestBody.language === "string" &&
      requestBody.language.toLowerCase().startsWith("es")
        ? "Spanish"
        : "English";

    const supportedImage =
      typeof image === "string" &&
      image.length <= 5_700_000 &&
      hasExpectedImageSignature(image);
    if (!supportedImage) {
      return Response.json(
        { error: "Choose a JPEG, PNG, or WebP image under 4 MB." },
        { status: 400 },
      );
    }

    let openAIResponse: Response;
    try {
      openAIResponse = await fetchOpenAI(
        "https://api.openai.com/v1/responses",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            input: [
              {
                role: "user",
                content: [
                  {
                    type: "input_text",
                    text: `Extract shopping items from this image. Respond in ${language}. Include only items that are clearly visible or written. Preserve useful quantities.`,
                  },
                  {
                    type: "input_image",
                    image_url: image,
                    detail: "auto",
                  },
                ],
              },
            ],
            text: {
              format: {
                type: "json_schema",
                name: "shopping_list",
                strict: true,
                schema: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    items: {
                      type: "array",
                      maxItems: 50,
                      items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          name: { type: "string" },
                          quantity: { type: ["string", "null"] },
                        },
                        required: ["name", "quantity"],
                      },
                    },
                  },
                  required: ["items"],
                },
              },
            },
          }),
        },
      );
    } catch {
      return Response.json(
        { error: "The image could not be analyzed. Please try again." },
        { status: 502 },
      );
    }

    if (!openAIResponse.ok) {
      return Response.json(
        { error: "The image could not be analyzed. Please try again." },
        { status: 502 },
      );
    }

    let openAIResult: {
      output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
    };
    try {
      openAIResult = (await openAIResponse.json()) as typeof openAIResult;
    } catch {
      return Response.json(
        { error: "The image could not be analyzed. Please try again." },
        { status: 502 },
      );
    }
    const outputText = openAIResult.output
      ?.flatMap((output) => output.content ?? [])
      .find((content) => content.type === "output_text")?.text;

    try {
      const result = validateModelOutput(
        JSON.parse(outputText ?? "") as unknown,
      );
      if (!result) throw new Error("Invalid model output");
      return Response.json(result);
    } catch {
      return Response.json(
        { error: "The image could not be analyzed. Please try again." },
        { status: 502 },
      );
    }
  };

export const config = {
  rateLimit: {
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
} as const;

export default createAnalyzeShoppingImageHandler({
  apiKey: process.env.OPENAI_API_KEY,
  fetchOpenAI: fetch,
  model: process.env.OPENAI_MODEL,
});
