import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
}: ConfirmDialogProps) => {
  //TODO: refactor all confirm dialogs
  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          onClose();
        }
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
    >
      <DialogTitle>
        <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CancelIcon color="primary" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" align="center">
          {description}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end", padding: "24px" }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: "primary",
            color: "white",
            marginRight: 2,
            fontWeight: "bold",
            minWidth: "120px",
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
            minWidth: "120px",
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
