import { describe, expect, it, vi } from "vitest";
import {
  analyzeShoppingImage,
  createImportedTasks,
  normalizeAnalyzedItems,
  toTaskText,
} from "./photoImport";

describe("normalizeAnalyzedItems", () => {
  it("trims valid item names and quantities", () => {
    expect(
      normalizeAnalyzedItems({
        items: [
          { name: "  Milk  ", quantity: " 2 " },
          { name: "Bananas", quantity: null },
        ],
      }),
    ).toEqual([
      { name: "Milk", quantity: "2" },
      { name: "Bananas", quantity: null },
    ]);
  });

  it("rejects blank item names", () => {
    expect(() =>
      normalizeAnalyzedItems({
        items: [{ name: "   ", quantity: null }],
      }),
    ).toThrow("invalid item name");
  });

  it("rejects responses with more than 50 items", () => {
    expect(() =>
      normalizeAnalyzedItems({
        items: Array.from({ length: 51 }, (_, index) => ({
          name: `Item ${index}`,
          quantity: null,
        })),
      }),
    ).toThrow("too many items");
  });
});

describe("analyzeShoppingImage", () => {
  it("posts the image and returns normalized items", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      Response.json({
        items: [{ name: "  Milk ", quantity: " 2 " }],
      }),
    );

    await expect(
      analyzeShoppingImage("data:image/jpeg;base64,abc", "en-US", fetchImpl),
    ).resolves.toEqual([{ name: "Milk", quantity: "2" }]);

    expect(fetchImpl).toHaveBeenCalledWith(
      "/.netlify/functions/analyze-shopping-image",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          image: "data:image/jpeg;base64,abc",
          language: "en-US",
        }),
      }),
    );
  });

  it("surfaces a safe server error message", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(
        Response.json(
          { error: "Image analysis is not configured yet." },
          { status: 503 },
        ),
      );

    await expect(
      analyzeShoppingImage("data:image/jpeg;base64,abc", "en-US", fetchImpl),
    ).rejects.toThrow("Image analysis is not configured yet.");
  });

  it("uses a safe fallback for non-JSON platform errors", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response("Too many requests", { status: 429 }));

    await expect(
      analyzeShoppingImage("data:image/jpeg;base64,abc", "en-US", fetchImpl),
    ).rejects.toThrow("The image could not be analyzed. Please try again.");
  });
});

describe("toTaskText", () => {
  it("includes a detected quantity when one is available", () => {
    expect(toTaskText({ name: "Milk", quantity: "2" })).toBe("2 Milk");
    expect(toTaskText({ name: "Bananas", quantity: null })).toBe("Bananas");
  });
});

describe("createImportedTasks", () => {
  it("creates categorized tasks with collision-free indexes", () => {
    const tasks = createImportedTasks(
      [
        { name: "Milk", quantity: "2" },
        { name: "Bananas", quantity: null },
      ],
      [{ idx: 4 }],
      "2026-08-08T20:00:00.000Z",
    );

    expect(tasks).toEqual([
      expect.objectContaining({
        idx: 5,
        text: "2 Milk",
        category: "Dairy & Eggs",
        createdAt: "2026-08-08T20:00:00.000Z",
      }),
      expect.objectContaining({
        idx: 6,
        text: "Bananas",
        category: "Produce",
        createdAt: "2026-08-08T20:00:00.000Z",
      }),
    ]);
  });
});
