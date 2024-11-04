import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SelectBox from "./SelectBox";
import Input from "./Input";
import { Priority, Status, useTodo } from "../contexts/TodoContext";
import {
  formatDate,
  generateRandomHash,
  formatEstimate,
} from "../utils/helpers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface AddModalProps {
  edit?: boolean;
  onEdit?: (value: boolean) => void;
  editedId?: number | undefined;
}

export default function AddModal({ edit, onEdit, editedId }: AddModalProps) {
  const [title, setTitle] = React.useState<string>("");
  const [priority, setPriority] = React.useState<string>("");
  const [estimate, setEstimate] = React.useState<string>();
  const [open, setOpen] = React.useState(false);
  const { dispatch, todos } = useTodo();
  const handleOpen = () => {
    if (!edit) setOpen(true);
  };
  const handleClose = () => {
    if (onEdit) onEdit(false);
    // setOpen(false)
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const formattedEstimate = estimate ? formatEstimate(Number(estimate)) : "0";
    if (edit && editedId !== undefined) {
      e.preventDefault();
      if (onEdit) onEdit(false);

      dispatch({
        type: "edit",
        payload: [
          editedId,
          {
            title: title,
            estimate: formattedEstimate,
            priority: priority as Priority,
          },
        ],
      });
    } else {
      setOpen(false);
      e.preventDefault();
      const todo = {
        id: todos.length + 1,
        title: title,
        priority: priority as Priority,
        createdAt: formatDate(new Date(), "todo"),
        estimate: formattedEstimate,
        status: Status.TODO,
        hash: generateRandomHash(),
      };
      dispatch({ type: "create", payload: todo });
    }
  }

  return (
    <div>
      {!edit && (
        <Fab color="primary" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      )}
      {(open || edit) && (
        <Modal
          open={!!(open || edit)}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign="center"
            >
              {!edit ? "Add a new Todo to your day 😎" : "Edit this task 📝"}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Input onSetState={setTitle} />
                <Input onSetState={setEstimate} type="estimate" />
                <SelectBox priority={priority} onSetPriority={setPriority} />
              </Box>

              <Button type="submit" variant="contained" fullWidth>
                {!edit ? "Add Todo" : "Edit Task"}
              </Button>
            </form>
          </Box>
        </Modal>
      )}
    </div>
  );
}
