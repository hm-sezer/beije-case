"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CartItem as CartItemType } from "@/types/product";
import { products, subCategories } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useProductQuantity } from "@/hooks/useProductQuantity";
import { ProductItem } from "@/components/custom-package/ProductItem";
import { useAppSelector } from "@/store/hooks";
import { selectSubCategoryTotal } from "@/store/slices/packageSlice";

interface EditPackageDialogProps {
  open: boolean;
  onClose: () => void;
  item: CartItemType;
}

function ProductItemWithQuantity({
  product,
  subCategory,
  onAdd,
  onRemove,
}: {
  product: any;
  subCategory: string;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const quantity = useProductQuantity(product.id, subCategory);

  return (
    <ProductItem
      product={product}
      quantity={quantity}
      onAdd={onAdd}
      onRemove={onRemove}
    />
  );
}

export function EditPackageDialog({
  open,
  onClose,
  item,
}: EditPackageDialogProps) {
  const { handleAddProduct, handleRemoveProduct } = useCart();
  
  // Tüm sub-category'leri al ve sadece aynı ana kategoriyi filtrele
  const relatedSubCategories = subCategories.filter((sc) => {
    const firstProduct = products.find((p) => p.subCategory === sc.name);
    const currentProduct = products.find((p) => p.subCategory === item.subCategory);
    return firstProduct && currentProduct && firstProduct.category === currentProduct.category;
  });

  // İlk sub-category default açık
  const [expandedAccordions, setExpandedAccordions] = React.useState<Set<string>>(
    new Set([item.subCategory])
  );

  // Accordion açma/kapama
  const handleAccordionChange = (subCategoryName: string) => {
    setExpandedAccordions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(subCategoryName)) {
        newSet.delete(subCategoryName);
      } else {
        newSet.add(subCategoryName);
      }
      return newSet;
    });
  };

  // Toplam fiyat hesapla
  const totalPrice = useAppSelector((state) =>
    selectSubCategoryTotal(state, item.subCategory)
  );

  // Toplam ürün sayısını hesapla
  const totalItems = item.products.reduce(
    (sum, p) => sum + p.quantity,
    0
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: "90vh",
          bgcolor: "#f9f5f2",
        },
      }}
    >
      <DialogContent sx={{ p: 0, bgcolor: "#f9f5f2" }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            pb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 0.5 }}>
              Paketini Özelleştir
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {totalItems} adet {item.subCategory}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: "text.secondary",
              "&:hover": { bgcolor: "grey.100" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Accordions */}
        <Box sx={{ px: 3, pb: 2, maxHeight: "60vh", overflowY: "auto" }}>
          {relatedSubCategories.map((subCat) => {
            const subCategoryProducts = products.filter(
              (p) => p.subCategory === subCat.name
            );
            
            // Find cart item for this sub-category
            const cartItem = item.subCategory === subCat.name ? item : null;
            const subCategoryTotal = cartItem 
              ? cartItem.products.reduce((sum, p) => sum + p.quantity, 0)
              : 0;

            return (
              <Accordion
                key={subCat.name}
                expanded={expandedAccordions.has(subCat.name)}
                onChange={() => handleAccordionChange(subCat.name)}
                sx={{
                  mb: 2,
                  borderRadius: "12px !important",
                  "&:before": { display: "none" },
                  boxShadow: "none",
                  bgcolor: "white",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    "& .MuiAccordionSummary-content": {
                      my: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pr: 1,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "grey.200",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1rem",
                      }}
                    >
                      📦
                    </Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {subCat.name}
                    </Typography>
                  </Box>
                  {subCategoryTotal > 0 && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mr: 1 }}
                    >
                      {subCategoryTotal} adet {subCat.name}
                    </Typography>
                  )}
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {subCategoryProducts.map((product) => (
                      <ProductItemWithQuantity
                        key={product.id}
                        product={product}
                        subCategory={subCat.name}
                        onAdd={() => handleAddProduct(product.id)}
                        onRemove={() => handleRemoveProduct(product.id)}
                      />
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>

        {/* Footer Button */}
        <Box
          sx={{
            p: 3,
            pt: 2,
            bgcolor: "white",
            borderRadius: "0 0 24px 24px",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={onClose}
            sx={{
              bgcolor: "black",
              color: "white",
              borderRadius: "24px",
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "grey.900",
              },
            }}
          >
            Sepeti Güncelle (₺{totalPrice.toFixed(2)})
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

