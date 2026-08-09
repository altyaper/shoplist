import { ChangeEvent, useMemo, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, CameraAlt, Image as ImageIcon } from "@mui/icons-material";
import { AnalyzedShoppingItem, analyzeShoppingImage } from "./photoImport";

const MAX_IMAGE_SIZE_BYTES = 4 * 1024 * 1024;
const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

type AnalyzeImage = (
  image: string,
  language: string,
) => Promise<AnalyzedShoppingItem[]>;

interface ReviewItem extends AnalyzedShoppingItem {
  selected: boolean;
}

interface PhotoImportDialogProps {
  open: boolean;
  language: string;
  onClose: () => void;
  onAddItems: (items: AnalyzedShoppingItem[]) => void;
  analyzeImage?: AnalyzeImage;
}

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }
      reject(new Error("The selected image could not be read."));
    };
    reader.onerror = () =>
      reject(new Error("The selected image could not be read."));
    reader.readAsDataURL(file);
  });

export const PhotoImportDialog = ({
  open,
  language,
  onClose,
  onAddItems,
  analyzeImage = analyzeShoppingImage,
}: PhotoImportDialogProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestVersion = useRef(0);

  const selectedCount = useMemo(
    () => items.filter((item) => item.selected && item.name.trim()).length,
    [items],
  );

  const reset = () => {
    requestVersion.current += 1;
    setImage(null);
    setItems([]);
    setLoading(false);
    setError(null);
  };

  const close = () => {
    reset();
    onClose();
  };

  const selectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const version = requestVersion.current + 1;
    requestVersion.current = version;
    setItems([]);
    setLoading(false);
    setError(null);

    if (
      !SUPPORTED_IMAGE_TYPES.includes(file.type) ||
      file.size > MAX_IMAGE_SIZE_BYTES
    ) {
      setImage(null);
      setError("Choose a JPEG, PNG, or WebP image under 4 MB.");
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      if (requestVersion.current === version) setImage(dataUrl);
    } catch (readError) {
      if (requestVersion.current !== version) return;
      setImage(null);
      setError(
        readError instanceof Error
          ? readError.message
          : "The selected image could not be read.",
      );
    }
  };

  const analyze = async () => {
    if (!image) return;

    const version = requestVersion.current + 1;
    requestVersion.current = version;
    setLoading(true);
    setError(null);
    try {
      const analyzedItems = await analyzeImage(image, language);
      if (requestVersion.current !== version) return;
      setItems(analyzedItems.map((item) => ({ ...item, selected: true })));
      if (!analyzedItems.length) {
        setError("No shopping items were detected. Try a clearer photo.");
      }
    } catch (analysisError) {
      if (requestVersion.current !== version) return;
      setItems([]);
      setError(
        analysisError instanceof Error
          ? analysisError.message
          : "The image could not be analyzed. Please try again.",
      );
    } finally {
      if (requestVersion.current === version) setLoading(false);
    }
  };

  const updateItem = (index: number, update: Partial<ReviewItem>) => {
    setItems((currentItems) =>
      currentItems.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...update } : item,
      ),
    );
  };

  const addSelectedItems = () => {
    const selectedItems = items
      .filter((item) => item.selected && item.name.trim())
      .map(({ name, quantity }) => ({
        name: name.trim(),
        quantity: quantity?.trim() || null,
      }));
    onAddItems(selectedItems);
    close();
  };

  return (
    <Dialog fullScreen open={open} onClose={close}>
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            aria-label="Close photo import"
            onClick={close}
            edge="start"
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" component="span">
            Import from photo
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ maxWidth: 720, margin: "0 auto" }}>
          <Typography color="text.secondary">
            Take a photo or choose an image of a handwritten list, receipt,
            recipe, or groceries. You can review every item before adding it.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CameraAlt />}
            >
              Take photo
              <input
                hidden
                aria-label="Take photo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                capture="environment"
                onChange={selectFile}
              />
            </Button>
            <Button
              component="label"
              variant="outlined"
              startIcon={<ImageIcon />}
            >
              Choose photo
              <input
                hidden
                aria-label="Choose photo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={selectFile}
              />
            </Button>
          </Stack>

          {image && (
            <Box
              component="img"
              src={image}
              alt="Selected shopping source"
              sx={{
                width: "100%",
                maxHeight: 360,
                objectFit: "contain",
                borderRadius: 2,
                backgroundColor: "grey.100",
              }}
            />
          )}

          {error && <Alert severity="error">{error}</Alert>}

          {image && !items.length && (
            <Button
              variant="contained"
              size="large"
              disabled={loading}
              onClick={analyze}
              startIcon={loading ? <CircularProgress size={18} /> : undefined}
            >
              {loading ? "Analyzing image…" : "Analyze image"}
            </Button>
          )}

          {!!items.length && (
            <Stack spacing={2}>
              <Typography variant="h6">Review detected items</Typography>
              {items.map((item, index) => (
                <Box
                  key={`detected-${index}`}
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "auto minmax(0, 1fr) minmax(90px, 0.35fr)",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={item.selected}
                        onChange={(event) =>
                          updateItem(index, {
                            selected: event.target.checked,
                          })
                        }
                      />
                    }
                    label=""
                    aria-label={`Include ${item.name}`}
                  />
                  <TextField
                    label="Item"
                    value={item.name}
                    onChange={(event) =>
                      updateItem(index, { name: event.target.value })
                    }
                    inputProps={{ "aria-label": `Item ${index + 1}` }}
                  />
                  <TextField
                    label="Quantity"
                    value={item.quantity ?? ""}
                    onChange={(event) =>
                      updateItem(index, {
                        quantity: event.target.value || null,
                      })
                    }
                    inputProps={{ "aria-label": `Quantity ${index + 1}` }}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      </DialogContent>

      {!!items.length && (
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={close}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!selectedCount}
            onClick={addSelectedItems}
          >
            Add {selectedCount} {selectedCount === 1 ? "item" : "items"}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default PhotoImportDialog;
