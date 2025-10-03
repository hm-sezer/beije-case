"use client";

import { Box, Typography } from "@mui/material";
import { Product } from "@/types/product";
import { QuantitySelector } from "./QuantitySelector";

interface ProductItemProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function ProductItem({
  product,
  quantity,
  onAdd,
  onRemove,
}: ProductItemProps) {
  const canIncrement = quantity < product.maxQuantity;
  const canDecrement = quantity > 0;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            bgcolor: "error.main",
            borderRadius: 0.5,
          }}
        />
        <Typography>{product.name}</Typography>
      </Box>
      <QuantitySelector
        quantity={quantity}
        onIncrement={onAdd}
        onDecrement={onRemove}
        canIncrement={canIncrement}
        canDecrement={canDecrement}
      />
    </Box>
  );
}

