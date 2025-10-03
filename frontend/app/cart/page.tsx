import { Box, Typography } from "@mui/material";
import { SubscriptionPackages } from "@/components/cart-page/subscriptions/SubscriptionPackages";
import { SubscriptionInfo } from "@/components/cart-page/subscriptions/SubscriptionInfo";
import { OrderSummary } from "@/components/cart-page/summary/OrderSummary";
import { DiscountCodeInput } from "@/components/cart-page/summary/DiscountCodeInput";
import { PriceSummary } from "@/components/cart-page/summary/PriceSummary";
import { CheckoutButton } from "@/components/cart-page/summary/CheckoutButton";
import { SubscriptionNote } from "@/components/cart-page/summary/SubscriptionNote";

export default function CartPage() {
  return (
    <Box sx={{ minHeight: "100vh", p: { xs: 2, md: 4, lg: 8 }, mx: "auto", maxWidth: "1200px" }}>
      {/* Page Title */}
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          fontWeight: 700, 
          mb: { xs: 3, md: 4 },
          fontSize: { xs: "1.5rem", md: "2rem" }
        }}
      >
        Sepetim
      </Typography>

      {/* Desktop: Two Column Layout */}
      <Box sx={{ display: { xs: "none", lg: "flex" }, justifyContent: "space-between", gap: 6 }}>
        {/* Left Side: Packages */}
        <Box sx={{ flex: 1, maxWidth: "600px" }}>
          <SubscriptionPackages />
          <SubscriptionInfo />
        </Box>

        {/* Right Side: Order Summary */}
        <Box sx={{ flex: 1, maxWidth: "440px" }}>
          <OrderSummary />
        </Box>
      </Box>

      {/* Mobile: Single Column Layout */}
      <Box sx={{ display: { xs: "flex", lg: "none" }, flexDirection: "column", gap: 3 }}>
        {/* 1. İndirim Kodu */}
        <DiscountCodeInput />

        {/* 2. Paketler (Tek Seferlik Alımlar / Abonelik Paketleri) */}
        <SubscriptionPackages />

        {/* 3. Subscription Info */}
        <SubscriptionInfo />

        {/* 4. Özet Başlık */}
        <Typography variant="h5" fontWeight={700}>
          Özet
        </Typography>

        {/* 5. Fiyat Detayları */}
        <PriceSummary />

        {/* 6. Sepeti Onayla Button */}
        <CheckoutButton />

        {/* 7. Bilgilendirme Notu */}
        <SubscriptionNote />
      </Box>
    </Box>
  );
}

