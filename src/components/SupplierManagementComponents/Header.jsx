import { Box, Button, Typography } from "@mui/material";
import { COLORS } from "../../constants";

export default function Header({ title, btnTitle, setOpen }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
      <Typography sx={{ fontWeight: "bold", fontSize: "26px", color: COLORS.PRIMARY }}> {title}</Typography>
      <Button variant="contained" sx={{ backgroundColor: COLORS.PRIMARY }} onClick={() => setOpen(true)}>
        {btnTitle}{" "}
      </Button>
    </Box>
  );
}
