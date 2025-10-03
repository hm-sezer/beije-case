import { PageHeader } from "@/components/custom-package/PageHeader";
import { ProductSection } from "@/components/custom-package/ProductSection";
import { CartSummary } from "@/components/custom-package/CartSummary";

export default function Home() {
  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen p-4 pb-32 md:pb-8 md:p-6 lg:p-8 mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-0">
          {/* Left Side - Product Selection */}
          <div className="flex-1 space-y-4 md:space-y-6 lg:max-w-[500px]">
            <PageHeader />
            <ProductSection />
          </div>

          {/* Right Side - Cart Summary (Desktop Only) */}
          <div className="hidden lg:block flex-1 lg:max-w-[440px]">
            <CartSummary />
          </div>
        </div>
      </div>

      {/* Mobile Cart Summary (Sticky Bottom) */}
      <div className="lg:hidden">
        <CartSummary />
      </div>
    </>
  );
}
