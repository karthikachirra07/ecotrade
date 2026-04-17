import Link from "next/link";
import { getSellerById, getProductsBySeller } from "@/lib/data";
export default function SellerPage({ params }: any) {
  const seller = getSellerById(Number(params.id));
  const products = getProductsBySeller(Number(params.id));

  if (!seller) {
    return <main className="p-6">Seller not found</main>;
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <section className="mb-8 rounded-3xl bg-card p-8 shadow-lg">
        <h1 className="text-3xl font-bold">{seller.name}</h1>
        <p className="mt-2 text-muted-foreground">City: {seller.city}</p>
        <p className="mt-1 text-muted-foreground">Pincode: {seller.pincode}</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="rounded-lg border border-border p-6 shadow-sm">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
            <p className="mt-3 font-semibold text-lg">₹{product.price}</p>
            <Link href={`/products/${product.id}`} className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
              View product
            </Link>
          </article>
        ))}
      </section>

      <div className="mt-8">
        <Link href="/sellers" className="rounded-lg border border-border px-4 py-2 text-foreground">
          Back to sellers
        </Link>
      </div>
    </main>
  );
}