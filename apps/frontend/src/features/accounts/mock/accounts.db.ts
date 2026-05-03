import type { Account } from "@budget/contracts";

export let accounts: Account[] = [
  {
    id: "1",
    accNumber: "301235456412",
    name: "SBI",
    type: "BANK",
    currency: "INR",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    accNumber: "547832109876",
    name: "HDFC",
    type: "CREDIT_CARD",
    currency: "INR",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    accNumber: null,
    name: "Cash",
    type: "CASH",
    currency: "INR",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    accNumber: null,
    name: "GPay",
    type: "WALLET",
    currency: "INR",
    createdAt: "",
    updatedAt: "",
  },
];
