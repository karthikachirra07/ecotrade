import { sellers, getProductsBySeller } from "@/lib/data";

export default function SellerPage({ params }: any) {
  const seller = sellers.find((s) => s.id === Number(params.id));
  const products = getProductsBySeller(Number(params.id));

  return (
    <div>
      <h1>{seller?.name}</h1>

      {products.map((p) => (
        <p key={p.id}>{p.name}</p>
      ))}
    </div>
  );
}