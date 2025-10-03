import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PackageState, PurchaseType } from "@/types/product";
import { products } from "@/data/products";

const initialState: PackageState = {
  items: [],
};

export const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{ productId: string; purchaseType?: PurchaseType }>
    ) => {
      const { productId, purchaseType = "subscription" } = action.payload;
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      const existingCartItem = state.items.find(
        (item) => item.subCategory === product.subCategory
      );

      if (existingCartItem) {
        const existingProduct = existingCartItem.products.find(
          (p) => p.productId === productId
        );

        if (existingProduct) {
          existingProduct.quantity += product.quantityStep;
        } else {
          existingCartItem.products.push({
            productId,
            quantity: product.quantityStep,
          });
        }
      } else {
        state.items.push({
          subCategory: product.subCategory,
          purchaseType,
          products: [
            {
              productId,
              quantity: product.quantityStep,
            },
          ],
        });
      }
    },

    removeProduct: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      const cartItem = state.items.find(
        (item) => item.subCategory === product.subCategory
      );
      if (!cartItem) return;

      const productInCart = cartItem.products.find((p) => p.productId === productId);
      if (!productInCart) return;

      productInCart.quantity -= product.quantityStep;

      if (productInCart.quantity <= 0) {
        cartItem.products = cartItem.products.filter((p) => p.productId !== productId);
      }

      if (cartItem.products.length === 0) {
        state.items = state.items.filter(
          (item) => item.subCategory !== product.subCategory
        );
      }
    },

    updateProductQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      const cartItem = state.items.find(
        (item) => item.subCategory === product.subCategory
      );
      if (!cartItem) return;

      const productInCart = cartItem.products.find((p) => p.productId === productId);
      if (!productInCart) return;

      productInCart.quantity = quantity;

      if (quantity <= 0) {
        cartItem.products = cartItem.products.filter((p) => p.productId !== productId);
        if (cartItem.products.length === 0) {
          state.items = state.items.filter(
            (item) => item.subCategory !== product.subCategory
          );
        }
      }
    },

    setPurchaseType: (
      state,
      action: PayloadAction<{ subCategory: string; purchaseType: PurchaseType }>
    ) => {
      const { subCategory, purchaseType } = action.payload;
      const cartItem = state.items.find((item) => item.subCategory === subCategory);
      if (!cartItem) return;

      cartItem.purchaseType = purchaseType;
    },

    clearSubCategory: (state, action: PayloadAction<string>) => {
      const subCategory = action.payload;
      state.items = state.items.filter((item) => item.subCategory !== subCategory);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateProductQuantity,
  setPurchaseType,
  clearSubCategory,
  clearCart,
} = packageSlice.actions;

export const selectCartItems = (state: { package: PackageState }) => state.package.items;

export const selectSubscriptionItems = (state: { package: PackageState }) =>
  state.package.items.filter((item) => item.purchaseType === "subscription");

export const selectOneTimeItems = (state: { package: PackageState }) =>
  state.package.items.filter((item) => item.purchaseType === "one-time");

export const selectTotalPrice = (state: { package: PackageState }) => {
  return state.package.items.reduce((total, cartItem) => {
    const itemTotal = cartItem.products.reduce((subTotal, cartProduct) => {
      const product = products.find((p) => p.id === cartProduct.productId);
      if (!product) return subTotal;

      const pricePerUnit =
        cartItem.purchaseType === "subscription"
          ? product.subscriptionPrice
          : product.oneTimePrice;

      const unitCount = cartProduct.quantity / product.quantityStep;

      return subTotal + pricePerUnit * unitCount;
    }, 0);

    return total + itemTotal;
  }, 0);
};

export const selectSubCategoryTotal = (
  state: { package: PackageState },
  subCategory: string
) => {
  const cartItem = state.package.items.find((item) => item.subCategory === subCategory);
  if (!cartItem) return 0;

  return cartItem.products.reduce((total, cartProduct) => {
    const product = products.find((p) => p.id === cartProduct.productId);
    if (!product) return total;

    const pricePerUnit =
      cartItem.purchaseType === "subscription"
        ? product.subscriptionPrice
        : product.oneTimePrice;

    const unitCount = cartProduct.quantity / product.quantityStep;

    return total + pricePerUnit * unitCount;
  }, 0);
};

export default packageSlice.reducer;

