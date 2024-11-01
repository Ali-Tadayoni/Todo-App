import { Box, Container } from "@mui/material";
import React from "react";
import Header from "./Header";
import BasicTable from "./Table";
import Chart from "./Chart";

const AppLayout: React.FC = () => {
  return (
    <Container sx={{ height: "100vh" }}>
      <Header />
      <Box sx={{ mt: 1, mb: 1 }}>
        <Chart />
      </Box>
      <BasicTable />
    </Container>
  );
};

export default AppLayout;
