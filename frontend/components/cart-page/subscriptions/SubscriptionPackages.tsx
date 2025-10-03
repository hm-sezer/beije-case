"use client";

import { Box, Typography } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { useCart } from "@/hooks/useCart";
import { PackageCard } from "./PackageCard";
import { PurchaseType } from "@/types/product";
import { useAppDispatch } from "@/store/hooks";
import { setPurchaseType } from "@/store/slices/packageSlice";

export function SubscriptionPackages() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.package.items);
  const { handleClearSubCategory } = useCart();

  const handlePurchaseTypeChange = (
    subCategory: string,
    purchaseType: PurchaseType
  ) => {
    dispatch(setPurchaseType({ subCategory, purchaseType }));
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Sepetiniz boş
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Ürün seçmeye başlamak için ana sayfaya dönün
        </Typography>
      </Box>
    );
  }

  // Purchase type'a göre gruplandır
  const subscriptionItems = cartItems.filter(
    (item) => item.purchaseType === "subscription"
  );
  const oneTimeItems = cartItems.filter(
    (item) => item.purchaseType === "one-time"
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Abonelik Paketleri */}
      {subscriptionItems.length > 0 && (
        <Box>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
            Abonelik Paketleri
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {subscriptionItems.map((item) => (
              <PackageCard
                key={item.subCategory}
                item={item}
                onDelete={handleClearSubCategory}
                onPurchaseTypeChange={handlePurchaseTypeChange}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Tek Seferlik Alımlar */}
      {oneTimeItems.length > 0 && (
        <Box>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
            Tek Seferlik Alımlar
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {oneTimeItems.map((item) => (
              <PackageCard
                key={item.subCategory}
                item={item}
                onDelete={handleClearSubCategory}
                onPurchaseTypeChange={handlePurchaseTypeChange}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

