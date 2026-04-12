import { BlockchainTransaction } from "./types";

// Simple SHA256-like hash generator (mock)
function generateHash(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const hashHex = Math.abs(hash).toString(16).padStart(8, "0");
  const timestamp = Date.now().toString(16);
  const random = Math.random().toString(16).slice(2, 10);
  return `0x${hashHex}${timestamp}${random}${hashHex}`.slice(0, 66);
}

// Mock Blockchain Ledger Class
class MockBlockchain {
  private ledger: BlockchainTransaction[] = [];
  private blockNumber: number = 1000000;

  constructor() {
    // Initialize with some mock historical transactions
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ecotrade_blockchain");
      if (stored) {
        const data = JSON.parse(stored);
        this.ledger = data.ledger || [];
        this.blockNumber = data.blockNumber || 1000000;
      }
    }
  }

  private save() {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "ecotrade_blockchain",
        JSON.stringify({
          ledger: this.ledger,
          blockNumber: this.blockNumber,
        })
      );
    }
  }

  createTransaction(
    from: string,
    to: string,
    amount: number,
    productIds: string[]
  ): BlockchainTransaction {
    const timestamp = new Date().toISOString();
    const dataToHash = `${from}${to}${amount}${timestamp}${productIds.join(",")}${Math.random()}`;
    const txHash = generateHash(dataToHash);

    this.blockNumber += 1;

    const transaction: BlockchainTransaction = {
      txHash,
      from,
      to,
      amount,
      timestamp,
      productIds,
      blockNumber: this.blockNumber,
    };

    this.ledger.push(transaction);
    this.save();

    return transaction;
  }

  getTransaction(txHash: string): BlockchainTransaction | undefined {
    return this.ledger.find((tx) => tx.txHash === txHash);
  }

  getTransactionsByAddress(address: string): BlockchainTransaction[] {
    return this.ledger.filter(
      (tx) => tx.from === address || tx.to === address
    );
  }

  getAllTransactions(): BlockchainTransaction[] {
    return [...this.ledger].reverse();
  }

  getBlockNumber(): number {
    return this.blockNumber;
  }
}

// Singleton instance
export const blockchain = new MockBlockchain();

// Helper function to format transaction hash for display
export function formatTxHash(hash: string): string {
  if (hash.length <= 16) return hash;
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}

// Calculate carbon footprint based on distance
export function calculateCarbonFootprint(distanceKm: number): number {
  // 0.21 kg CO2 per km for bike delivery
  return Math.round(distanceKm * 0.21 * 100) / 100;
}

// Calculate distance saved compared to supermarket supply chain
export function calculateCarbonSaved(localDistance: number): number {
  // Average supermarket supply chain: ~500km
  const avgSupplyChainDistance = 500;
  const savedDistance = avgSupplyChainDistance - localDistance;
  return Math.max(0, Math.round(savedDistance * 0.21 * 100) / 100);
}
