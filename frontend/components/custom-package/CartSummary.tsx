"use client";

import { Box, Typography, Paper } from "@mui/material";

export function CartSummary() {
  return (
    <Paper
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        position: "sticky",
        top: 16,
        boxShadow: "none",
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        Sepet Özeti
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Sepetiniz boş. Ürün seçmeye başlayın!
      </Typography>
    </Paper>
  );
}

