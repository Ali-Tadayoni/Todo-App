import { Container, Typography } from "@mui/material";
import React from "react";
import Header from "./Header";
import BasicTable from "./Table";

const AppLayout: React.FC = () => {
  return (
    <Container sx={{ height: "100vh" }}>
      <Header />
      <Typography sx={{ mt: 10, textAlign: "center" }}>Chart</Typography>
      <BasicTable />
    </Container>
  );
};

export default AppLayout;
