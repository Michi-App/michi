import { Address } from "viem"

export interface BackpackCreatedLog {
  args: {
    backpack: Address;
    sender: Address;
  }
}