import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { getSellerById } from "@/lib/data";
import { Star, MapPin, CheckCircle2, Package, Calendar, ArrowLeft } from "lucide-react";

interface SellerPageProps {
  params: Promise<{ id: string }>;
}

export default async function SellerPage({ params }: SellerPageProps) {
  const { id } = await params;
  const seller = getSellerById(id);

  if (!seller) {
    notFound();
  }

  const productsWithSeller = seller.products.map((p) => ({
    ...p,
    sellerId: seller.id,
    sellerName: seller.name,
  }));

  const joinedDate = new Date(seller.joinedDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Seller Header */}
        <div className="bg-primary">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <Link
              href="/sellers"
              className="mb-6 inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sellers
            </Link>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-4 border-primary-foreground/20 sm:h-32 sm:w-32">
                <Image
                  src={seller.avatar}
                  alt={seller.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                    {seller.name}
                  </h1>
                  {seller.verified && (
                    <Badge className="bg-foreground text-primary gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified Seller
                    </Badge>
                  )}
                </div>

                <p className="mt-3 text-foreground/80 max-w-2xl">
                  {seller.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-foreground/70">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {seller.city}, {seller.state} - {seller.pincode}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {joinedDate}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-foreground text-foreground" />
                    <span className="text-lg font-semibold text-foreground">
                      {seller.rating}
                    </span>
                    <span className="text-foreground/70">rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-foreground" />
                    <span className="text-lg font-semibold text-foreground">
                      {seller.totalOrders.toLocaleString()}
                    </span>
                    <span className="text-foreground/70">orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-foreground">
                      {seller.products.length}
                    </span>
                    <span className="text-foreground/70">products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6" id="products">
          <h2 className="text-2xl font-bold mb-6">
            Products by {seller.name}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productsWithSeller.map((product) => (
              <ProductCard key={product.id} product={product} showSeller={false} />
            ))}
          </div>

          {seller.products.length === 0 && (
            <div className="rounded-lg border-2 border-dashed p-12 text-center">
              <p className="text-muted-foreground">
                This seller has no products listed yet.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
