"use client";

import { Box, Typography, Paper, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CartItem as CartItemType } from "@/types/product";
import { products } from "@/data/products";

interface CartItemProps {
  item: CartItemType;
  onDelete: (subCategory: string) => void;
}

export function CartItem({ item, onDelete }: CartItemProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "grey.50",
      }}
    >
      {/* Sub-category başlığı + Sil butonu */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
        <Typography variant="subtitle2" fontWeight={700}>
          {item.subCategory}
        </Typography>
        <IconButton
          size="small"
          onClick={() => onDelete(item.subCategory)}
          sx={{ color: "text.secondary" }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Ürün listesi */}
      {item.products.map((cartProduct) => {
        const product = products.find((p) => p.id === cartProduct.productId);
        if (!product) return null;

        const pricePerUnit =
          item.purchaseType === "subscription"
            ? product.subscriptionPrice
            : product.oneTimePrice;

        // Kaç adet paket var (quantity / quantityStep)
        const unitCount = cartProduct.quantity / product.quantityStep;
        
        // Toplam fiyat (paket sayısı × birim fiyat)
        const totalPrice = pricePerUnit * unitCount;

        return (
          <Box
            key={cartProduct.productId}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 0.5,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {cartProduct.quantity} x {product.name}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              ₺{totalPrice.toFixed(2)}
            </Typography>
          </Box>
        );
      })}
    </Paper>
  );
}

