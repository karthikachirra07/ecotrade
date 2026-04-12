import Link from "next/link";

export function SellerCard({ seller }: any) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        width: "200px",
      }}
    >
      <h3>{seller.name}</h3>
      <p>{seller.city}</p>
      <p>Pincode: {seller.pincode}</p>

      <Link href={`/sellers/${seller.id}`}>
        <button>View Seller</button>
      </Link>
    </div>
  );
}