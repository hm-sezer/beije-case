"use client";

import { useState } from "react";
import { ProductCategory } from "@/types/product";
import { products, subCategories } from "@/data/products";
import { ProductTabs } from "./ProductTabs";
import { ProductAccordionList } from "./ProductAccordionList";

export function ProductSection() {
  const [activeTab, setActiveTab] = useState<ProductCategory>(
    ProductCategory.MENSTRUAL
  );

  const filteredSubCategories = subCategories.filter((subCat) =>
    products.some((p) => p.subCategory === subCat.name && p.category === activeTab)
  );

  return (
    <div className="space-y-6">
      <ProductTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <ProductAccordionList subCategories={filteredSubCategories} />
    </div>
  );
}

