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
import { useCart } from "@/hooks/useCart";
import { useProductQuantity } from "@/hooks/useProductQuantity";
import { ProductItem } from "./ProductItem";

interface ProductAccordionListProps {
  subCategories: SubCategoryInfo[];
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

export function ProductAccordionList({
  subCategories,
}: ProductAccordionListProps) {
  const { handleAddProduct, handleRemoveProduct } = useCart();
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
                .map((product) => (
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
      ))}
    </Box>
  );
}

