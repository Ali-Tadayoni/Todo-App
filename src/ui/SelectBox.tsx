import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SelectBoxProps {
  priority: string;
  onSetPriority: (priority: string) => void;
}

export default function SelectBox({ priority, onSetPriority }: SelectBoxProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onSetPriority(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: "100%", pt: 2, pb: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priority}
          label="Priority"
          onChange={handleChange}
        >
          <MenuItem value="HIGH">High</MenuItem>
          <MenuItem value="MEDIUM">Medium</MenuItem>
          <MenuItem value="LOW">Low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
