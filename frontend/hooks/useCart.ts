import { useAppDispatch } from "@/store/hooks";
import { addProduct, removeProduct, clearSubCategory } from "@/store/slices/packageSlice";

/**
 * Hook for cart operations
 * Provides handlers for adding, removing products and clearing sub-categories
 */
export function useCart() {
  const dispatch = useAppDispatch();

  const handleAddProduct = (productId: string) => {
    dispatch(addProduct({ productId }));
  };

  const handleRemoveProduct = (productId: string) => {
    dispatch(removeProduct(productId));
  };

  const handleClearSubCategory = (subCategory: string) => {
    dispatch(clearSubCategory(subCategory));
  };

  return {
    handleAddProduct,
    handleRemoveProduct,
    handleClearSubCategory,
  };
}

