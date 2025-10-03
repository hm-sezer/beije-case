"use client";

import { useState } from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { CartItem as CartItemType, PurchaseType } from "@/types/product";
import { products } from "@/data/products";
import { PurchaseTypeSelector } from "./PurchaseTypeSelector";
import { EditPackageDialog } from "./EditPackageDialog";

interface PackageCardProps {
  item: CartItemType;
  onDelete: (subCategory: string) => void;
  onPurchaseTypeChange: (subCategory: string, purchaseType: PurchaseType) => void;
}

export function PackageCard({
  item,
  onDelete,
  onPurchaseTypeChange,
}: PackageCardProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: "white",
      }}
    >
      {/* Header: Icon + Title + Actions */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Icon placeholder */}
          <Box
            sx={{
              width: 48,
              height: 48,
              bgcolor: "#f5e6d3",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            📦
          </Box>
          <Typography variant="h6" fontWeight={600}>
            {item.subCategory}
          </Typography>
        </Box>

        {/* Edit & Delete buttons */}
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton
            size="small"
            sx={{ color: "text.secondary" }}
            onClick={() => setEditDialogOpen(true)}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{ color: "text.secondary" }}
            onClick={() => onDelete(item.subCategory)}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Package Contents */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mb: 1.5, fontWeight: 600 }}
        >
          Paket içeriği:
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {item.products.map((cartProduct) => {
            const product = products.find((p) => p.id === cartProduct.productId);
            if (!product) return null;

            return (
              <Box
                key={cartProduct.productId}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: "20px",
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "grey.50",
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: "error.main",
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {cartProduct.quantity} adet {product.name}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Purchase Type Selector & Total Price */}
      <PurchaseTypeSelector item={item} onPurchaseTypeChange={onPurchaseTypeChange} />
    </Paper>

    {/* Edit Dialog */}
    <EditPackageDialog
      open={editDialogOpen}
      onClose={() => setEditDialogOpen(false)}
      item={item}
    />
    </>
  );
}

