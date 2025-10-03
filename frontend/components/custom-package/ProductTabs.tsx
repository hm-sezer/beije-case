"use client";

import { Tabs, Tab, Box } from "@mui/material";
import { ProductCategory } from "@/types/product";
import { PRODUCT_TABS } from "@/constants/app";

interface ProductTabsProps {
  activeTab: ProductCategory;
  onTabChange: (tab: ProductCategory) => void;
}

export function ProductTabs({ activeTab, onTabChange }: ProductTabsProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => onTabChange(newValue as ProductCategory)}
        variant="fullWidth"
        centered
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "black",
            height: 2,
          },
        }}
      >
        <Tab
          label={PRODUCT_TABS.MENSTRUAL}
          value={ProductCategory.MENSTRUAL}
          sx={{
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 500,
            color: "text.secondary",
            "&.Mui-selected": {
              color: "text.primary",
            },
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
        <Tab
          label={PRODUCT_TABS.SUPPORT}
          value={ProductCategory.SUPPORT}
          sx={{
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 500,
            color: "text.secondary",
            "&.Mui-selected": {
              color: "text.primary",
            },
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
      </Tabs>
    </Box>
  );
}

