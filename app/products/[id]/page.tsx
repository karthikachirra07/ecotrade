import Link from "next/link";
import { getProductById, getSellerById } from "@/lib/data";

export default function ProductDetails({ params }: any) {
  const product = getProductById(Number(params.id));
  const seller = product ? getSellerById(product.sellerId) : null;

  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-6 rounded-3xl bg-card p-8 shadow-lg">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-3 text-muted-foreground">{product.description}</p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold">Price</p>
            <p className="text-2xl">₹{product.price}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Eco Score</p>
            <p>{product.ecoScore}/10</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Seller</p>
            <Link href={`/sellers/${seller?.id}`} className="text-primary underline">
              {seller?.name || "Unknown Seller"}
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/products" className="rounded-full bg-primary px-4 py-2 text-primary-foreground">
            Back to products
          </Link>
          <Link href="/cart" className="rounded-full border border-border px-4 py-2 text-foreground">
            View cart
          </Link>
        </div>
      </div>
    </main>
  );
}
