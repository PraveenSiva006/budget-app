import type { AccountDTO } from "@budget/contracts";

export let accounts: AccountDTO[] = [
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
    name: "Cash",
    type: "CASH",
    currency: "INR",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    name: "GPay",
    type: "WALLET",
    currency: "INR",
    createdAt: "",
    updatedAt: "",
  },
];
