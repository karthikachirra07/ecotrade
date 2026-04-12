"use client";

export default function Cart() {
  const cart = [
    { name: "Eco Bottle", price: 200 },
  ];

  const placeOrder = async () => {
    await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        userId: "1",
        products: cart,
        total: 200,
      }),
    });

    alert("Order placed!");
  };

  return (
    <div>
      <h2>Cart</h2>

      {cart.map((item, i) => (
        <p key={i}>{item.name}</p>
      ))}

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}