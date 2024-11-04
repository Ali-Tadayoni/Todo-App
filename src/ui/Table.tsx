import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Priority, Status, useTodo } from "../contexts/TodoContext";
import { useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import StatusDialog from "./StatusDialog";
import { AlertDialog } from "./DeleteTodo";
import AddModal from "./AddModal";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function createData(
  title: string,
  priority: Priority,
  createdAt: string,
  estimate: string,
  status: Status,
  id: number,
  hash: string
) {
  return { title, priority, createdAt, estimate, status, id, hash };
}

export default function BasicTable() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [todoID, setTodoId] = useState<number>();
  const { todos, dispatch } = useTodo();
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isEditSession, setIsEditSession] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Status | "ALL">("ALL");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "ALL">("ALL");
  const [sortOrder, setSortOrder] = useState<"high-to-low" | "low-to-high">(
    "high-to-low"
  );
  const deleteHashRef = useRef<string | null>(null);

  const handleClickOpen = (id: number) => {
    setIsOpenDialog(true);
    setTodoId(id);
  };

  const handleClose = (value?: string) => {
    setIsOpenDialog(false);

    if (todoID && value)
      dispatch({
        type: "changeStatus",
        payload: [todoID, value as Status],
      });
  };

  const handleClickDeleteIcon = (id: number, hash: string) => {
    deleteHashRef.current = hash;
    setTodoId(id);
    setIsOpenDelete(true);
  };
  const handleDeleteTodo = (id: number) => {
    dispatch({ type: "delete", payload: id });
    setIsOpenDelete(false);
  };
  const handleEditSession = (id: number) => {
    setIsEditSession(true);
    setTodoId(id);
  };
  const rows = todos.map((todo) =>
    createData(
      todo.title,
      todo.priority,
      todo.createdAt,
      todo.estimate,
      todo.status,
      todo.id,
      todo.hash
    )
  );

  // Define priority order mapping
  const priorityOrder = {
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
  };

  // Filter and Sort Logic
  const filteredAndSortedRows = rows
    .filter((row) =>
      statusFilter !== "ALL" ? row.status === statusFilter : true
    )
    .filter((row) =>
      priorityFilter !== "ALL" ? row.priority === priorityFilter : true
    )
    .sort((a, b) => {
      const aPriority = priorityOrder[a.priority];
      const bPriority = priorityOrder[b.priority];

      if (sortOrder === "high-to-low") {
        return bPriority - aPriority; // High to Low sorting
      } else {
        return aPriority - bPriority; // Low to High sorting
      }
    });
  return (
    <>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <FormControl fullWidth>
          <InputLabel>Status Filter</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Status | "ALL")}
            displayEmpty
            label="Status Filter"
          >
            <MenuItem value="ALL">All</MenuItem>
            {Object.values(Status).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Priority Filter</InputLabel>
          <Select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value as Priority | "ALL")
            }
            displayEmpty
            label="Priority Filter"
          >
            <MenuItem value="ALL">All</MenuItem>
            {Object.values(Priority).map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Sort By Priority</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "high-to-low" | "low-to-high")
            }
            label="Sort By Priority"
          >
            <MenuItem value="high-to-low">High to Low</MenuItem>
            <MenuItem value="low-to-high">Low to High</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, mb: 13 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Priority</TableCell>
              <TableCell align="right">Date-Time</TableCell>
              <TableCell align="right">Estimate&nbsp;(h)</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedRows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleClickOpen(row.id)}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.priority}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right">{row.estimate}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  {
                    <>
                      <EditIcon
                        onClick={(event) => {
                          event.stopPropagation();
                          handleEditSession(row.id);
                        }}
                      />

                      <DeleteIcon
                        onClick={(event) => {
                          event.stopPropagation();
                          handleClickDeleteIcon(row.id, row.hash);
                        }}
                      />
                    </>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isOpenDialog && (
        <StatusDialog open={isOpenDialog} onClose={handleClose} />
      )}
      {isOpenDelete && (
        <AlertDialog
          open={isOpenDelete}
          onDelete={handleDeleteTodo}
          deleteHash={deleteHashRef.current}
          onClose={setIsOpenDelete}
          id={todoID}
        />
      )}
      {isEditSession && (
        <AddModal
          edit={isEditSession}
          onEdit={setIsEditSession}
          editedId={todoID}
        />
      )}
    </>
  );
}
