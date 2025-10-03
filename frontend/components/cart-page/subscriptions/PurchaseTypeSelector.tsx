"use client";

import { Box, Typography, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { CartItem as CartItemType, PurchaseType } from "@/types/product";
import { products } from "@/data/products";

interface PurchaseTypeSelectorProps {
  item: CartItemType;
  onPurchaseTypeChange: (subCategory: string, purchaseType: PurchaseType) => void;
}

export function PurchaseTypeSelector({
  item,
  onPurchaseTypeChange,
}: PurchaseTypeSelectorProps) {
  // Abonelik fiyatını hesapla
  const subscriptionPrice = item.products.reduce((total, cartProduct) => {
    const product = products.find((p) => p.id === cartProduct.productId);
    if (!product) return total;
    const unitCount = cartProduct.quantity / product.quantityStep;
    return total + product.subscriptionPrice * unitCount;
  }, 0);

  // Tek seferlik fiyatı hesapla
  const oneTimePrice = item.products.reduce((total, cartProduct) => {
    const product = products.find((p) => p.id === cartProduct.productId);
    if (!product) return total;
    const unitCount = cartProduct.quantity / product.quantityStep;
    return total + product.oneTimePrice * unitCount;
  }, 0);

  // Seçili olan tipte toplam fiyat
  const currentPrice = item.purchaseType === "subscription" ? subscriptionPrice : oneTimePrice;

  const handlePurchaseTypeChange = (event: SelectChangeEvent) => {
    onPurchaseTypeChange(item.subCategory, event.target.value as PurchaseType);
  };

  return (
    <>
      {/* Purchase Type Dropdown */}
      <Select
        fullWidth
        value={item.purchaseType}
        onChange={handlePurchaseTypeChange}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "divider",
          },
        }}
      >
        <MenuItem value="subscription">
          <Box>
            <Typography fontWeight={600}>
              Abone Ol - ₺{subscriptionPrice.toFixed(2)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              2 ayda Bir Gönderim
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem value="one-time">
          <Box>
            <Typography fontWeight={600}>
              Tek Seferlik Al - ₺{oneTimePrice.toFixed(2)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Tek Seferlik Alım
            </Typography>
          </Box>
        </MenuItem>
      </Select>

      {/* Total Price */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          ₺{currentPrice.toFixed(2)}
        </Typography>
      </Box>
    </>
  );
}

