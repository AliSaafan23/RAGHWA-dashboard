import React from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export const SharedLayout = () => {
  return (
    <>
      <Box
        position={"relative"}
        justifyContent={"space-between"}
        sx={{
          background: "linear-gradient(135deg, #e2e5e9 0%, #e4e8f0 100%)",
          pt: 2,
          pl: 3,
        }}
        gap={2}
        display={"flex"}
        flexDirection={"row"}
      >
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "#ffffff",
            borderRadius: "16px",
            padding: 3,
            minHeight: "100vh",
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
