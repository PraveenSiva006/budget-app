import AccountCard from "@/features/accounts/components/AccountCard";
import type { AccountDTO } from "@budget/types";

function Accounts() {
  const accounts: AccountDTO[] = [
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

  return (
    <div className="font-sans p-7 grid grid-cols-4 gap-3">
      {accounts.map((account) => (
        <AccountCard account={account} key={account.id} />
      ))}
    </div>
  );
}

export default Accounts;
