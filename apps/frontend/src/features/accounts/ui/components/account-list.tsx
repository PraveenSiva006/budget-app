import { Card } from "@/components/ui/card";
import AccountCard from "@/features/accounts/ui/components/account-card";
import { useAccountUIStore } from "@/features/accounts/ui/store/accounts.store";
import type { AccountDTO } from "@budget/contracts";

function AccountsList({ accounts }: { accounts: AccountDTO[] }) {
  const handleAction = useAccountUIStore((s) => s.handleAction);

  return (
    <div
      className="px-7 grid"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
      }}
    >
      {accounts?.map((account) => (
        <AccountCard key={account.id} account={account} className="w-full" />
      ))}
      <Card
        onClick={() => handleAction({ type: "create" })}
        className="w-full cursor-pointer h-48 flex justify-center items-center border-2 border-dashed bg-neutral-50 dark:bg-gray-900 rounded-xl"
      >
        <div className="relative">
          <span className="inline-block rounded-xs h-2.5 w-20 bg-zinc-200 translate-x-[50%]"></span>
          <span className="inline-block rounded-xs h-2.5 w-20 bg-zinc-200 -translate-x-[50%] rotate-90"></span>
        </div>
      </Card>
    </div>
  );
}

export default AccountsList;
