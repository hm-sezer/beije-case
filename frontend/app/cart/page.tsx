import { Box, Typography } from "@mui/material";
import { SubscriptionPackages } from "@/components/cart-page/subscriptions/SubscriptionPackages";
import { SubscriptionInfo } from "@/components/cart-page/subscriptions/SubscriptionInfo";
import { OrderSummary } from "@/components/cart-page/summary/OrderSummary";

export default function CartPage() {
  return (
    <Box className="min-h-screen p-8 mx-auto max-w-6xl">
      {/* Page Title */}
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 4 }}>
        Sepetim
      </Typography>

      {/* Two Column Layout */}
      <Box className="flex justify-between gap-6">
        {/* Left Side: Packages */}
        <Box className="flex-1 max-w-[600px]">
          <SubscriptionPackages />
          <SubscriptionInfo />
        </Box>

        {/* Right Side: Order Summary */}
        <Box className="flex-1 max-w-[440px]">
          <OrderSummary />
        </Box>
      </Box>
    </Box>
  );
}

