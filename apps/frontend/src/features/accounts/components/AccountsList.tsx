import AccountCard from "@/features/accounts/components/AccountCard";
import type { AccountDTO } from "@budget/types";

function AccountsList({ onAdd }: { onAdd: () => void }) {
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
    <div
      className="px-7 grid"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
      }}
    >
      {accounts.map((account) => (
        <AccountCard account={account} key={account.id} className="w-full" />
      ))}
      <div
        onClick={onAdd}
        className="w-full cursor-pointer h-48 flex justify-center items-center border-2 border-dashed bg-[#fdfdfd] opacity-80 rounded-xl"
      >
        <div className="relative">
          <span className="inline-block rounded-xs h-2.5 w-20 bg-zinc-200 translate-x-[50%]"></span>
          <span className="inline-block rounded-xs h-2.5 w-20 bg-zinc-200 -translate-x-[50%] rotate-90"></span>
        </div>
      </div>
    </div>
  );
}

export default AccountsList;
