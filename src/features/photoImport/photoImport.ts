import { findCategory } from "../../data/categoryFinder";
import { Task } from "../../models";

export interface AnalyzedShoppingItem {
  name: string;
  quantity: string | null;
}

type FetchLike = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

export const analyzeShoppingImage = async (
  image: string,
  language: string,
  fetchImpl: FetchLike = fetch,
): Promise<AnalyzedShoppingItem[]> => {
  const genericError = "The image could not be analyzed. Please try again.";
  let response: Response;
  try {
    response = await fetchImpl("/.netlify/functions/analyze-shopping-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image, language }),
    });
  } catch {
    throw new Error(genericError);
  }

  let payload: unknown;
  try {
    payload = (await response.json()) as unknown;
  } catch {
    throw new Error(genericError);
  }
  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "error" in payload &&
      typeof payload.error === "string"
        ? payload.error
        : genericError;
    throw new Error(message);
  }
  return normalizeAnalyzedItems(payload);
};

export const toTaskText = ({ name, quantity }: AnalyzedShoppingItem): string =>
  quantity ? `${quantity} ${name}` : name;

export const createImportedTasks = (
  items: AnalyzedShoppingItem[],
  existingTasks: Array<Pick<Task, "idx">>,
  timestamp: string,
): Task[] => {
  const nextIndex =
    existingTasks.reduce((highest, task) => Math.max(highest, task.idx), -1) +
    1;

  return items.map((item, offset) => ({
    idx: nextIndex + offset,
    text: toTaskText(item),
    category: findCategory(item.name),
    done: false,
    deleteOnComplete: true,
    createdAt: timestamp,
  }));
};

export const normalizeAnalyzedItems = (
  payload: unknown,
): AnalyzedShoppingItem[] => {
  if (!payload || typeof payload !== "object" || !("items" in payload)) {
    throw new Error("The analysis response did not contain a shopping list.");
  }

  const { items } = payload as { items: unknown };
  if (!Array.isArray(items)) {
    throw new Error("The analysis response did not contain a shopping list.");
  }
  if (items.length > 50) {
    throw new Error("The analysis response contained too many items.");
  }

  return items.map((item) => {
    if (!item || typeof item !== "object") {
      throw new Error("The analysis response contained an invalid item.");
    }

    const { name, quantity } = item as { name?: unknown; quantity?: unknown };
    if (typeof name !== "string") {
      throw new Error("The analysis response contained an invalid item name.");
    }

    const normalizedName = name.trim();
    if (!normalizedName) {
      throw new Error("The analysis response contained an invalid item name.");
    }

    if (quantity !== null && typeof quantity !== "string") {
      throw new Error("The analysis response contained an invalid quantity.");
    }

    return {
      name: normalizedName,
      quantity: typeof quantity === "string" ? quantity.trim() : null,
    };
  });
};
