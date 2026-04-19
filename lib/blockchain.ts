import crypto from "crypto"

type TransactionInput = {
  from: string
  to: string
  amount: number
  productIds: string[]
}

type Transaction = TransactionInput & {
  txHash: string
  timestamp: number
}

class Blockchain {
  ledger: Transaction[] = []

  createTransaction({
    from,
    to,
    amount,
    productIds
  }: TransactionInput): Transaction {

    const timestamp = Date.now()

    const txHash = crypto
      .createHash("sha256")
      .update(`${from}-${to}-${amount}-${timestamp}`)
      .digest("hex")

    const tx: Transaction = {
      txHash,
      from,
      to,
      amount,
      productIds,
      timestamp
    }

    this.ledger.push(tx)
    return tx
  }
}

export const blockchain = new Blockchain()