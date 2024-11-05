import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export interface AlertDialogProps {
  open: boolean;
  onClose: (value: boolean) => void;
  onDelete: (id: number) => void;
  deleteHash: string | null;
  id: number | undefined;
}

function AlertDialog({
  deleteHash,
  onClose,
  open,
  onDelete,
  id,
}: AlertDialogProps) {
  const [isHashCheckOpen, setIsHashCheckOpen] = useState(false);

  const handleClose = () => {
    onClose(false);
  };

  const handleHashCheck = () => {
    // onClose(false);
    setIsHashCheckOpen(true);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you share about deleting this task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will permanently delete this task and remove it forever ⚠️
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleHashCheck} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {isHashCheckOpen && (
        <HashCheck
          open={isHashCheckOpen}
          onClose={setIsHashCheckOpen}
          onDelete={onDelete}
          deleteHash={deleteHash}
          id={id}
        />
      )}
    </>
  );
}

// Hash Check //

export interface HashCheckProps {
  open: boolean;
  onClose: (value: boolean) => void;
  onDelete: (id: number) => void;
  deleteHash: string | null;
  id: number | undefined;
}

function HashCheck({
  open,
  onClose,
  deleteHash,
  id,
  onDelete,
}: HashCheckProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleClose = () => {
    onClose(false);
  };

  const handleDelete = () => {
    if (id !== undefined && input === deleteHash) {
      onDelete(id);
      handleClose();
    } else {
      setError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Deleting A Todo. ⚠️</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`To confirm, type "${deleteHash}" in the box below.`}
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          label="Confirmation Hash"
          type="text"
          fullWidth
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError(false);
          }}
          error={error}
          helperText={error ? "Incorrect hash. Please try again." : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { AlertDialog, HashCheck };
