import { Box } from "@mui/system";

import { Typography } from "@mui/material";
import Clock from "./Clock";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AddTodo from "./AddTodo";
import { formatDate } from "../utils/helpers";

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
      <AddTodo />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: 25 }}>
            {formatDate(new Date())}
          </Typography>
          <Clock />
        </Box>
        <AccessAlarmIcon sx={{ fontSize: 60 }} />
      </Box>
    </Box>
  );
};

export default Header;
