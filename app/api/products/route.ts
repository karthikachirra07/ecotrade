export const runtime = "nodejs"

export async function GET() {
  return Response.json([
    {
      id: "1",
      name: "Organic Tomatoes",
      price: 40,
      ecoScore: 5
    },
    {
      id: "2",
      name: "Fresh Milk",
      price: 60,
      ecoScore: 4
    }
  ])
}