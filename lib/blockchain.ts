import * as CryptoJS from "crypto-js";
import type { BlockchainTransaction } from "./types";

export type Transaction = BlockchainTransaction;

class MockBlockchain {
  private chain: Transaction[] = [];

  createTransaction(data: Omit<Transaction, "txHash" | "timestamp" | "blockNumber">) {
    const timestamp = Date.now();
    const raw = JSON.stringify(data) + timestamp;

    const txHash = CryptoJS.SHA256(raw).toString();

    const tx: Transaction = {
      ...data,
      txHash,
      timestamp,
      blockNumber: this.chain.length + 1,
    };

    this.chain.push(tx);

    return tx;
  }

  getTransactions() {
    return this.chain;
  }
}

export const blockchain = new MockBlockchain();