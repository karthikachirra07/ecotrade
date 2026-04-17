import Link from "next/link";
import { calculateDistance } from "@/lib/data";
import { MapPin, Star } from "lucide-react";

export function SellerCard({ seller, userPincode }: any) {
  const distance = userPincode ? calculateDistance(userPincode, seller.pincode) : null;

  return (
    <Link href={`/sellers/${seller.id}`}>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{seller.name}</h3>
            <div className="mt-2 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{seller.city}</span>
            </div>
          </div>
          {distance && (
            <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {distance.toFixed(1)} km
            </div>
          )}
        </div>

        <div className="mb-4 flex items-center gap-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">Certified Organic</span>
        </div>

        <div className="text-xs text-muted-foreground space-y-1 mb-4">
          <p>📍 Pincode: {seller.pincode}</p>
          <p>🌾 Local, sustainable produce</p>
        </div>

        <button className="w-full rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted">
          View Products →
        </button>
      </div>
    </Link>
  );
}