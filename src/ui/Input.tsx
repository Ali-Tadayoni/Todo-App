import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
interface InputProps {
  onSetState: (title: string) => void;
  type?: string;
}
const Input: React.FC<InputProps> = ({ onSetState, type }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSetState(e.target.value);
  };

  return (
    <Box sx={{ pt: 2, width: "100%" }}>
      <TextField
        sx={{ width: "100%" }}
        id="outlined-basic"
        label={type ? "Estimate" : "Name"}
        variant="outlined"
        onChange={handleChange}
      />
    </Box>
  );
};

export default Input;
