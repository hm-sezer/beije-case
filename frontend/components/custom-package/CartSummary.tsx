"use client";

import { Box, Typography, Paper, Button, Chip } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { selectTotalPrice } from "@/store/slices/packageSlice";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "./CartItem";

export function CartSummary() {
  const cartItems = useAppSelector((state) => state.package.items);
  const totalPrice = useAppSelector(selectTotalPrice);
  const { handleClearSubCategory } = useCart();

  const isEmpty = cartItems.length === 0;

  return (
    <Paper
      sx={{
        p: 3,
        borderColor: "divider",
        borderRadius: 2,
        position: "sticky",
        top: 16,
        boxShadow: "none",
        bgcolor: "white",
      }}
    >
      {/* Başlık + Badge */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          Özel Paketin
        </Typography>
        <Chip
          icon={
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "rgb(77, 188, 168)",
                mr: 0.5,
              }}
            />
          }
          label="2 ayda bir gönderim"
          sx={{
            bgcolor: "rgb(209, 237, 229)",
            color: "text.primary",
            fontSize: "0.75rem",
            height: 28,
            "& .MuiChip-icon": { ml: 1 },
          }}
        />
      </Box>

      {/* Açıklama */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Kişisel ihtiyacına yönelik istediğin miktarda Ped, Günlük Ped, Tampon veya destekleyici ürünler ekleyerek kendine özel bir paket oluşturabilirsin.
      </Typography>

      {/* Sepet İçeriği */}
      {isEmpty ? (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
          Sepetiniz boş. Ürün seçmeye başlayın!
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
          {cartItems.map((item) => (
            <CartItem
              key={item.subCategory}
              item={item}
              onDelete={handleClearSubCategory}
            />
          ))}
        </Box>
      )}

      {/* Sepete Ekle Butonu */}
      <Button
        variant="contained"
        fullWidth
        disabled={isEmpty}
        sx={{
          bgcolor: isEmpty ? "grey.300" : "black",
          color: "white",
          borderRadius: "24px",
          py: 1.5,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          "&:hover": {
            bgcolor: isEmpty ? "grey.300" : "grey.900",
          },
          "&.Mui-disabled": {
            bgcolor: "grey.300",
            color: "grey.500",
          },
        }}
      >
        Sepete Ekle (₺{totalPrice.toFixed(2)})
      </Button>
    </Paper>
  );
}

