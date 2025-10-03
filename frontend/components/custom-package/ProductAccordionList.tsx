"use client";

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Avatar,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SubCategoryInfo } from "@/types/product";
import { products } from "@/data/products";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addProduct, removeProduct } from "@/store/slices/packageSlice";
import { ProductItem } from "./ProductItem";

interface ProductAccordionListProps {
  subCategories: SubCategoryInfo[];
}

export function ProductAccordionList({
  subCategories,
}: ProductAccordionListProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.package.items);
  const [expandedAccordions, setExpandedAccordions] = React.useState<Set<string>>(
    new Set([subCategories[0]?.name]) // İlk accordion default açık
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

  // Her product için quantity'yi bul
  const getProductQuantity = (productId: string, subCategory: string): number => {
    const cartItem = cartItems.find((item) => item.subCategory === subCategory);
    if (!cartItem) return 0;
    
    const product = cartItem.products.find((p) => p.productId === productId);
    return product?.quantity || 0;
  };

  // + butonuna basıldığında
  const handleAddProduct = (productId: string) => {
    dispatch(addProduct({ productId }));
  };

  // - butonuna basıldığında
  const handleRemoveProduct = (productId: string) => {
    dispatch(removeProduct(productId));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {subCategories.map((subCat) => (
        <Accordion
          key={subCat.name}
          expanded={expandedAccordions.has(subCat.name)}
          onChange={() => handleAccordionChange(subCat.name)}
          sx={{
            borderColor: "divider",
            borderRadius: "8px !important",
            "&:before": { display: "none" },
            boxShadow: "none",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              "& .MuiAccordionSummary-content": {
                my: 1.5,
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "grey.200",
                  fontSize: "0.875rem",
                }}
              >
                📦
              </Avatar>
              <Typography variant="subtitle1" fontWeight={600}>
                {subCat.name}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Alert
              icon="💚"
              severity="success"
              sx={{ mb: 2, bgcolor: "rgb(236, 241, 207)" }}
            >
              {subCat.description}
            </Alert>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {products
                .filter((p) => p.subCategory === subCat.name)
                .map((product) => {
                  const quantity = getProductQuantity(product.id, subCat.name);
                  
                  return (
                    <ProductItem
                      key={product.id}
                      product={product}
                      quantity={quantity}
                      onAdd={() => handleAddProduct(product.id)}
                      onRemove={() => handleRemoveProduct(product.id)}
                    />
                  );
                })}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

