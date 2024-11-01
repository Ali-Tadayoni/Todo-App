import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>("");

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return <Typography sx={{ fontSize: 25 }}>{time}</Typography>;
};

export default Clock;
