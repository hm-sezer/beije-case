import { PageHeader } from "@/components/custom-package/PageHeader";
import { ProductSection } from "@/components/custom-package/ProductSection";
import { CartSummary } from "@/components/custom-package/CartSummary";

export default function Home() {
  return (
    <div className="min-h-screen p-8 mx-auto max-w-6xl">
      <div className="flex justify-between">
        <div className="flex-1 space-y-6 max-w-[500px]">
          <PageHeader />
          <ProductSection />
        </div>

        <div className="flex-1 max-w-[440px]">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
