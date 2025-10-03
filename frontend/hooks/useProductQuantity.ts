import { useAppSelector } from "@/store/hooks";

/**
 * Hook to get the quantity of a specific product in the cart
 * @param productId - The ID of the product
 * @param subCategory - The sub-category the product belongs to
 * @returns The quantity of the product in the cart (0 if not found)
 */
export function useProductQuantity(productId: string, subCategory: string): number {
  const cartItems = useAppSelector((state) => state.package.items);
  
  const cartItem = cartItems.find((item) => item.subCategory === subCategory);
  if (!cartItem) return 0;
  
  const product = cartItem.products.find((p) => p.productId === productId);
  return product?.quantity || 0;
}

