import React from "react";
import Nav from "./nav/Nav.tsx";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { paths } from "../constants";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      {location?.pathname !== paths.LOGIN_PAGE && <Nav />}
      <Box
        sx={{
          padding: (theme) => theme.spacing(2),
        }}
      >
        <main>{children}</main>
      </Box>
    </Box>
  );
}
