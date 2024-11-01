import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Typography } from "@mui/material";
import Clock from "./Clock";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        pt: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Typography>date</Typography>
        <Clock />
        <AccessAlarmIcon sx={{ fontSize: 60 }} />
      </Box>
    </Box>
  );
};

export default Header;
