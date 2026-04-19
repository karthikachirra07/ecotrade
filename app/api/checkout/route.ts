import { blockchain } from "@/lib/blockchain"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const body = await req.json()

  const tx = blockchain.createTransaction({
    from: "consumer1",
    to: "seller1",
    amount: body.amount,
    productIds: []
  })

  return Response.json(tx)
}