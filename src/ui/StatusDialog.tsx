import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import { blue } from "@mui/material/colors";

const status = ["Todo", "Doing", "Done", "Warning", "Pending", "Failed"];

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value?: string) => void;
}

function StatusDialog({ onClose, open }: SimpleDialogProps) {
  const handleClose = () => {
    onClose(undefined);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set Todo Status 👀</DialogTitle>
      <List sx={{ pt: 0 }}>
        {status.map((sta) => (
          <ListItem disableGutters key={sta}>
            <ListItemButton onClick={() => handleListItemClick(sta)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <TaskAltIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={sta} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default StatusDialog;
