"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { getProductsBySeller } from "@/lib/data";
import { EcoScoreBadge } from "@/components/eco-score";
import {
  MapPin,
  Leaf,
  Award,
  ArrowRight,
  Truck,
} from "lucide-react";

interface SellerCardProps {
  seller: User;
  distance?: number;
}

export function SellerCard({ seller, distance }: SellerCardProps) {
  const products = getProductsBySeller(seller.id);
  const avgEcoScore =
    products.length > 0
      ? products.reduce((sum, p) => sum + p.ecoScore, 0) / products.length
      : 0;

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Leaf className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{seller.farmName}</h3>
              <p className="text-sm text-muted-foreground">{seller.name}</p>
            </div>
          </div>
          {avgEcoScore > 0 && <EcoScoreBadge score={avgEcoScore} />}
        </div>

        <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
          {seller.farmDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {seller.organicCertified && (
            <Badge variant="secondary" className="gap-1">
              <Award className="h-3 w-3" />
              Certified Organic
            </Badge>
          )}
          <Badge variant="outline" className="gap-1">
            <MapPin className="h-3 w-3" />
            {seller.city}
          </Badge>
          {distance !== undefined && (
            <Badge variant="outline" className="gap-1">
              <Truck className="h-3 w-3" />
              {distance.toFixed(1)} km away
            </Badge>
          )}
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{products.length}</span>{" "}
          products available
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={`/seller/${seller.id}`} className="flex-1">
            <Button className="w-full" variant="default">
              View Farm
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
