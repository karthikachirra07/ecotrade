import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>
        🌱 Welcome to EcoTrade
      </h1>

      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Shop eco-friendly products from trusted sellers
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}