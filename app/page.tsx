import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Leaf,
  Truck,
  Shield,
  TrendingDown,
  ArrowRight,
  MapPin,
  Users,
  Package,
  Sprout,
} from "lucide-react";
import { sellers } from "@/lib/data";

export default function HomePage() {
  const featuredSellers = sellers.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">


      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 leaf-pattern">
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Leaf className="h-4 w-4" />
                Farm Fresh, Directly to You
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
                Connect with Local Farmers,{" "}
                <span className="eco-text-gradient">Reduce Your Footprint</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
                EcoTrade bridges the gap between small farmers and conscious
                consumers. Buy fresh, organic produce while supporting
                sustainable agriculture and reducing carbon emissions.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/browse">
                  <Button size="lg" className="gap-2">
                    Start Shopping
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register?role=seller">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Sprout className="h-4 w-4" />
                    Become a Seller
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="border-y bg-card/50 backdrop-blur">
            <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-8 md:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Local Farmers
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10,000+</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Happy Customers
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50,000kg</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  CO2 Saved
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Cities Served
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold">How EcoTrade Works</h2>
              <p className="mt-4 text-muted-foreground">
                Simple, transparent, and sustainable. Here&apos;s how we connect
                farmers directly to your table.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <Card className="relative overflow-hidden border-2 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">
                    1. Enter Your Location
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Share your pincode to discover farmers in your area. We
                    prioritize proximity to minimize delivery emissions.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">
                    2. Choose Your Farmer
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Browse verified farmers, see their eco-scores, practices,
                    and products. Build direct relationships with growers.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Package className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">
                    3. Get Fresh Delivery
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Receive farm-fresh produce in biodegradable packaging. Track
                    your carbon savings with every order.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why EcoTrade */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold">Why Choose EcoTrade?</h2>
              <p className="mt-4 text-muted-foreground">
                We&apos;re not just another grocery app. We&apos;re building a
                sustainable food ecosystem.
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <TrendingDown className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">Carbon Tracking</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  See your carbon footprint per order and track how much you save
                  vs supermarkets.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">Eco Scores</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every product rated on sustainability - organic, pesticide-free,
                  water conservation.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">Transparent Payments</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Blockchain-verified transactions ensure fair prices for farmers
                  and traceability for you.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">Eco Packaging</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  No plastic. All deliveries in biodegradable or cloth bags from
                  local artisans.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Farmers */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Meet Our Farmers</h2>
                <p className="mt-2 text-muted-foreground">
                  Dedicated growers committed to sustainable agriculture
                </p>
              </div>
              <Link href="/sellers">
                <Button variant="outline" className="hidden gap-2 sm:flex">
                  View All Farmers
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredSellers.map((seller) => (
                <Card key={seller.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <Leaf className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{seller.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {seller.city}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
                      {seller.id}
                    </p>
                    <Link href={`/seller/${seller.id}`}>
                      <Button variant="link" className="mt-4 h-auto p-0">
                        Visit Farm <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link href="/sellers">
                <Button variant="outline" className="gap-2">
                  View All Farmers
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="eco-gradient py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold">
              Ready to Make a Difference?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Join thousands of conscious consumers supporting local farmers and
              reducing their environmental impact with every purchase.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2"
                >
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/browse">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
