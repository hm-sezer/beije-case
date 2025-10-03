"use client";

import { Box, Typography, Divider } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { selectTotalPrice } from "@/store/slices/packageSlice";

export function PriceSummary() {
  const cartItems = useAppSelector((state) => state.package.items);
  const totalPrice = useAppSelector(selectTotalPrice);

  // Abonelik sayısı
  const subscriptionCount = cartItems.filter(
    (item) => item.purchaseType === "subscription"
  ).length;

  // Kargo ücreti (şimdilik 0)
  const shippingCost = 0;

  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 3,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Abonelikler */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" color="text.secondary">
          Abonelikler ({subscriptionCount})
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          ₺{totalPrice.toFixed(2)}
        </Typography>
      </Box>

      {/* Kargo Ücreti */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" color="text.secondary">
          Kargo Ücreti
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          ₺{shippingCost.toFixed(2)}
        </Typography>
      </Box>

      <Divider />

      {/* Toplam */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={700}>
          Toplam
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          ₺{totalPrice.toFixed(2)}
        </Typography>
      </Box>

      {/* Kargo Bedava Badge */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          alignSelf: "flex-end",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "success.main",
            fontWeight: 500,
          }}
        >
          🚚 Kargo bedava
        </Typography>
      </Box>
    </Box>
  );
}

