"use client";

import { Box, Typography, Button, TextField } from "@mui/material";

export function DiscountCodeInput() {
  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
        İndirim Kodu Gir
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          placeholder="Kodun"
          size="small"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: "black",
            color: "white",
            borderRadius: "24px",
            px: 3,
            textTransform: "none",
            fontWeight: 600,
            whiteSpace: "nowrap",
            "&:hover": {
              bgcolor: "grey.900",
            },
          }}
        >
          Uygula
        </Button>
      </Box>
    </Box>
  );
}

