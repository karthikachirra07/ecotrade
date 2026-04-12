import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProductById, getSellerById } from "@/lib/data";
import { Star, ShoppingCart, Truck, Shield, ArrowLeft, CheckCircle2, MapPin } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const seller = getSellerById(product.sellerId);

  if (!seller) {
    notFound();
  }

  const relatedProducts = seller.products
    .filter((p) => p.id !== product.id)
    .slice(0, 4)
    .map((p) => ({ ...p, sellerId: seller.id, sellerName: seller.name }));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          {/* Breadcrumb */}
          <Link
            href="/products"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <Badge className="mb-4">{product.category}</Badge>
              <h1 className="text-3xl font-bold sm:text-4xl">{product.name}</h1>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              <p className="mt-6 text-lg text-muted-foreground">
                {product.description}
              </p>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-4xl font-bold">₹{product.price}</span>
                <span className="text-muted-foreground">inclusive of all taxes</span>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="flex-1 gap-2" disabled={!product.inStock}>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1" disabled={!product.inStock}>
                  Buy Now
                </Button>
              </div>

              <div className="mt-8 space-y-4 rounded-lg border bg-card p-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Free Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      Orders above ₹500 qualify for free delivery
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Quality Guaranteed</p>
                    <p className="text-sm text-muted-foreground">
                      Fresh products from verified sellers
                    </p>
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <div className="mt-8 rounded-lg border bg-card p-4">
                <h3 className="font-semibold mb-3">Sold by</h3>
                <Link
                  href={`/sellers/${seller.id}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="relative h-12 w-12 overflow-hidden rounded-full flex-shrink-0">
                    <Image
                      src={seller.avatar}
                      alt={seller.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {seller.name}
                      </span>
                      {seller.verified && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {seller.city}, {seller.pincode}
                    </div>
                    <div className="flex items-center gap-1 text-sm mt-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span>{seller.rating}</span>
                      <span className="text-muted-foreground">
                        ({seller.totalOrders.toLocaleString()} orders)
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-6">More from {seller.name}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} showSeller={false} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
