"use client";

import { Box, Typography } from "@mui/material";
import { DiscountCodeInput } from "./DiscountCodeInput";
import { PriceSummary } from "./PriceSummary";
import { CheckoutButton } from "./CheckoutButton";
import { SubscriptionNote } from "./SubscriptionNote";

export function OrderSummary() {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 16,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Başlık */}
      <Typography variant="h5" fontWeight={700}>
        Özet
      </Typography>

      {/* İndirim Kodu */}
      <DiscountCodeInput />

      {/* Fiyat Detayları */}
      <PriceSummary />

      {/* Sepeti Onayla Button */}
      <CheckoutButton />

      {/* Bilgilendirme Notu */}
      <SubscriptionNote />
    </Box>
  );
}

