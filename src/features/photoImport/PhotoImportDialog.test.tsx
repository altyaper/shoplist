// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../themes/theme";
import { PhotoImportDialog } from "./PhotoImportDialog";

afterEach(cleanup);

const renderDialog = (
  props: Partial<React.ComponentProps<typeof PhotoImportDialog>> = {},
) => {
  const defaultProps: React.ComponentProps<typeof PhotoImportDialog> = {
    open: true,
    language: "en-US",
    onClose: vi.fn(),
    onAddItems: vi.fn(),
    analyzeImage: vi.fn().mockResolvedValue([
      { name: "Milk", quantity: "2" },
      { name: "Bananas", quantity: null },
    ]),
  };

  return render(
    <ThemeProvider theme={theme}>
      <PhotoImportDialog {...defaultProps} {...props} />
    </ThemeProvider>,
  );
};

describe("PhotoImportDialog", () => {
  it("analyzes a selected photo and submits reviewed items", async () => {
    const onAddItems = vi.fn();
    renderDialog({ onAddItems });

    const file = new File(["image bytes"], "list.jpg", { type: "image/jpeg" });
    fireEvent.change(screen.getByLabelText("Choose photo"), {
      target: { files: [file] },
    });

    await screen.findByAltText("Selected shopping source");
    fireEvent.click(screen.getByRole("button", { name: "Analyze image" }));

    const milkInput = await screen.findByDisplayValue("Milk");
    expect(milkInput).toBeInTheDocument();
    expect(screen.getByDisplayValue("Bananas")).toBeInTheDocument();

    milkInput.focus();
    expect(milkInput).toHaveFocus();
    fireEvent.change(milkInput, { target: { value: "Almond milk" } });
    expect(screen.getByDisplayValue("Almond milk")).toHaveFocus();

    fireEvent.click(screen.getByRole("button", { name: "Add 2 items" }));

    await waitFor(() => {
      expect(onAddItems).toHaveBeenCalledWith([
        { name: "Almond milk", quantity: "2" },
        { name: "Bananas", quantity: null },
      ]);
    });
  });

  it("ignores stale analysis after another image is selected", async () => {
    let resolveAnalysis:
      | ((items: Array<{ name: string; quantity: null }>) => void)
      | undefined;
    const analyzeImage = vi.fn().mockReturnValue(
      new Promise((resolve) => {
        resolveAnalysis = resolve;
      }),
    );
    renderDialog({ analyzeImage });

    const chooser = screen.getByLabelText("Choose photo");
    fireEvent.change(chooser, {
      target: {
        files: [new File(["first"], "first.jpg", { type: "image/jpeg" })],
      },
    });
    await screen.findByAltText("Selected shopping source");
    fireEvent.click(screen.getByRole("button", { name: "Analyze image" }));

    fireEvent.change(chooser, {
      target: {
        files: [new File(["second"], "second.jpg", { type: "image/jpeg" })],
      },
    });
    await waitFor(() => {
      expect(screen.getByAltText("Selected shopping source")).toHaveAttribute(
        "src",
        expect.stringContaining("c2Vjb25k"),
      );
    });

    resolveAnalysis?.([{ name: "Stale milk", quantity: null }]);

    await waitFor(() => {
      expect(screen.queryByDisplayValue("Stale milk")).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Analyze image" }),
      ).toBeInTheDocument();
    });
  });
});
