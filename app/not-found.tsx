import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-primary/10">
            <span className="text-4xl font-bold text-primary">404</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl">Page Not Found</h1>
        <p className="mt-4 text-muted-foreground max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <Search className="h-4 w-4" />
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
