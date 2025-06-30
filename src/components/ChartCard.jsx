import React from "react";
import { Card, Typography } from "@mui/material";

function ChartCard({ title }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography color="text.secondary">{title}</Typography>
    </Card>
  );
}

export default ChartCard;
