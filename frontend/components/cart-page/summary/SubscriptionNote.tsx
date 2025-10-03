"use client";

import { Box, Typography } from "@mui/material";

export function SubscriptionNote() {
  return (
    <Box sx={{ bgcolor: "white", p: 3, borderRadius: 2 }}>
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Typography sx={{ fontSize: "1.2rem" }}>⏰</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          Abonelik paketleri 2 ayda bir yenilenir ve kayıtlı karttan otomatik
          ödeme alınır. Bugün sipariş verirsen bir sonraki ödemen 28/11/2025
          tarihinde alınır.
        </Typography>
      </Box>
    </Box>
  );
}

