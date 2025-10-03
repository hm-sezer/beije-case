import { Box, Typography, Button } from "@mui/material";
import { PAGE_HEADER } from "@/constants/app";

export function PageHeader() {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: "text.primary" }}>
          {PAGE_HEADER.TITLE}
        </Typography>
        <Button
          variant="text"
          sx={{
            textTransform: "none",
            color: "text.secondary",
            "&:hover": { color: "text.primary" },
          }}
        >
          {PAGE_HEADER.HOW_IT_WORKS}
        </Button>
      </Box>
      <Typography variant="body1" color="text.secondary">
        {PAGE_HEADER.DESCRIPTION}
      </Typography>
    </Box>
  );
}

