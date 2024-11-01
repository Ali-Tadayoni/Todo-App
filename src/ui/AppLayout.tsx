import { Container, Typography } from "@mui/material";
import React from "react";
import Header from "./Header";

const AppLayout: React.FC = () => {
  return (
    <Container sx={{ height: "100vh" }}>
      <Header />
      <Typography sx={{ mt: 10, textAlign: "center" }}>Chart</Typography>
    </Container>
  );
};

export default AppLayout;
