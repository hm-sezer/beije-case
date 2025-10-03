"use client";

import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  canIncrement: boolean;
  canDecrement: boolean;
}

export function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  canIncrement,
  canDecrement,
}: QuantitySelectorProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "24px",
        px: 2,
        py: 0.5,
      }}
    >
      <IconButton
        size="small"
        sx={{ color: "text.secondary" }}
        onClick={onDecrement}
        disabled={!canDecrement}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography
        sx={{
          minWidth: 32,
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {quantity}
      </Typography>
      <IconButton
        size="small"
        sx={{ color: "text.secondary" }}
        onClick={onIncrement}
        disabled={!canIncrement}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

