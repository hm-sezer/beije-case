export enum ProductCategory {
  MENSTRUAL = "menstrual",
  SUPPORT = "support",
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subCategory: string;
  subCategoryIcon: string;
  productIcon: string;
  subscriptionPrice: number;
  oneTimePrice: number;
  quantityStep: number;
  minQuantity: number;
  maxQuantity: number;
}

export interface SubCategoryInfo {
  name: string;
  description: string;
  icon: string;
}

export interface CartProduct {
  productId: string;
  quantity: number;
}

export type PurchaseType = "subscription" | "one-time";

export interface CartItem {
  subCategory: string;
  purchaseType: PurchaseType;
  products: CartProduct[];
}

export interface PackageState {
  items: CartItem[];
}

