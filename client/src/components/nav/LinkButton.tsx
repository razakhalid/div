import React from "react";
import { Box, Button } from "@mui/material";

export default function LinkButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Button
      sx={{
        width: "100%",
        justifyContent: "flex-start",
        paddingLeft: (theme) => theme.spacing(2),
      }}
    >
      {icon}
      <Box sx={{ marginLeft: (theme) => theme.spacing(1) }}>{label}</Box>
    </Button>
  );
}
