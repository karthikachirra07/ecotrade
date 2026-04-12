import { getAllProducts } from "@/lib/data";

export default function ProductDetails({ params }: any) {
  const product = getAllProducts().find(
    (p) => p.id === Number(params.id)
  );

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
    </div>
  );
}
