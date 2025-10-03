"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Paper, Button, Chip, IconButton, Collapse } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppSelector } from "@/store/hooks";
import { selectTotalPrice } from "@/store/slices/packageSlice";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "./CartItem";
import { CART, APP_CONFIG } from "@/constants/app";

export function CartSummary() {
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.package.items);
  const totalPrice = useAppSelector(selectTotalPrice);
  const { handleClearSubCategory } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);

  const isEmpty = cartItems.length === 0;

  const handleAddToCart = () => {
    router.push("/cart");
  };

  return (
    <Paper
      sx={{
        // Desktop: Sticky right sidebar
        p: { xs: 0, lg: 3 },
        borderColor: "divider",
        borderRadius: { xs: 0, lg: 2 },
        position: { xs: "fixed", lg: "sticky" },
        bottom: { xs: 0, lg: "auto" },
        top: { xs: "auto", lg: 16 },
        left: { xs: 0, lg: "auto" },
        right: { xs: 0, lg: "auto" },
        width: { xs: "100%", lg: "auto" },
        zIndex: { xs: 1000, lg: "auto" },
        boxShadow: { xs: "0 -2px 10px rgba(0,0,0,0.1)", lg: "none" },
        bgcolor: "white",
      }}
    >
      {/* Mobile: Sticky Bottom Bar */}
      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        {/* Expanded State: Cart Items */}
        <Collapse in={isExpanded}>
          <Box sx={{ p: 3, maxHeight: "60vh", overflowY: "auto", bgcolor: "white" }}>
            {/* Sepet İçeriği */}
            {isEmpty ? (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 4 }}>
                {CART.EMPTY_MESSAGE}
              </Typography>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.subCategory}
                    item={item}
                    onDelete={handleClearSubCategory}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Collapse>

        {/* Collapsed State: Total Bar + Button */}
        <Box sx={{ bgcolor: "white", p: 2 }}>
          {/* Total Row */}
          <Box
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="body1" fontWeight={500} color="text.primary">
                Toplam
              </Typography>
              <IconButton size="small" sx={{ color: "text.primary", p: 0 }}>
                {isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
            </Box>
            <Typography variant="h6" fontWeight={700} color="text.primary">
              {APP_CONFIG.CURRENCY_SYMBOL}{totalPrice.toFixed(2)}
            </Typography>
          </Box>

          {/* Sepete Ekle Button */}
          <Button
            variant="contained"
            fullWidth
            disabled={isEmpty}
            onClick={handleAddToCart}
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
            {CART.ADD_TO_CART_BUTTON}
          </Button>
        </Box>
      </Box>

      {/* Desktop: Regular Sidebar */}
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        {/* Başlık + Badge */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            {CART.TITLE}
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
            label={CART.DELIVERY_BADGE}
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
          {CART.DESCRIPTION}
        </Typography>

        {/* Sepet İçeriği */}
        {isEmpty ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
            {CART.EMPTY_MESSAGE}
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
          onClick={handleAddToCart}
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
          {CART.ADD_TO_CART_BUTTON} ({APP_CONFIG.CURRENCY_SYMBOL}{totalPrice.toFixed(2)})
        </Button>
      </Box>
    </Paper>
  );
}

