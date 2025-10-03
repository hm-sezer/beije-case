"use client";

import { Box, Button } from "@mui/material";
import { useAppSelector } from "@/store/hooks";

export function CheckoutButton() {
  const cartItems = useAppSelector((state) => state.package.items);
  const isEmpty = cartItems.length === 0;

  return (
    <Box sx={{ p: 3, borderRadius: 2 }}>
      <Button
        variant="contained"
        fullWidth
        disabled={isEmpty}
        sx={{
          bgcolor: isEmpty ? "grey.300" : "black",
          color: "white",
          borderRadius: "24px",
          py: 1.5,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          "&:hover": {
            bgcolor: isEmpty ? "grey.300" : "grey.900",
          },
          "&.Mui-disabled": {
            bgcolor: "grey.300",
            color: "grey.500",
          },
        }}
      >
        Sepeti Onayla
      </Button>
    </Box>
  );
}

