import { Address } from "viem";

export const michiBackpackAddress: Address =
  "0xE15c65F038782314C803B94f0813Abc853feC2B0";

export const abi = [
  {
      inputs: [
        { internalType: "address", name: "erc6551Registry_", type: "address" },
        {
          internalType: "address",
          name: "erc6551Implementation_",
          type: "address",
        },
        { internalType: "address", name: "michiBackpack_", type: "address" },
        { internalType: "address", name: "feeReceiver_", type: "address" },
        { internalType: "uint256", name: "depositFee_", type: "uint256" },
        { internalType: "uint256", name: "feePrecision_", type: "uint256" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [{ internalType: "uint256", name: "depositFee", type: "uint256" }],
      name: "InvalidDepositFee",
      type: "error",
    },
    {
      inputs: [
        { internalType: "address", name: "feeRecipient", type: "address" },
      ],
      name: "InvalidFeeReceiver",
      type: "error",
    },
    { inputs: [], name: "OwnerMismatch", type: "error" },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "TokenAlreadyApproved",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "TokenNotApproved",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "UnauthorizedToken",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "user", type: "address" }],
      name: "UnauthorizedUser",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "backpack",
          type: "address",
        },
      ],
      name: "BackpackCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountAfterFees",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "feeTaken",
          type: "uint256",
        },
      ],
      name: "Deposit",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "addApprovedToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "approvedToken",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "quantity", type: "uint256" }],
      name: "createBackpack",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "depositFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "address", name: "backpack", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "bool", name: "takeFee", type: "bool" },
      ],
      name: "depositYT",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
      ],
      name: "depositsByAccountByToken",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "depositsByToken",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "erc6551Implementation",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "erc6551Registry",
      outputs: [
        { internalType: "contract IERC6551Registry", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "feePrecision",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "feeReceiver",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "feesCollectedByToken",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "listApprovedTokens",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "michiBackpack",
      outputs: [
        { internalType: "contract IMichiBackpack", name: "", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "removeApprovedToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "newDepositFee", type: "uint256" },
      ],
      name: "setDepositFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "newFeeReceiver", type: "address" },
      ],
      name: "setFeeReceiver",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
    ],
      name: "updateImplementation",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
];
