import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AccountUpdate from "@/features/accounts/components/update-account";
import AccountCreate from "../features/accounts/components/create-account";
import AccountsList from "@/features/accounts/components/account-list";

import { useAccountUIStore } from "@/features/accounts/account.store";
import { useGetAccounts } from "../features/accounts/hooks/use-account-actions";
import DeleteAccount from "@/features/accounts/components/delete-account";

function AccountsPage() {
  const form = useAccountUIStore((s) => s.form);
  const closeForm = useAccountUIStore((s) => s.closeForm);

  const { data, isLoading } = useGetAccounts();

  if (isLoading) {
    return <div className="app-container mx-auto">Loading...</div>;
  }

  return (
    <div className="app-container mx-auto pt-9">
      <AccountsList accounts={data!} />

      <Dialog open={form.mode !== "closed"} onOpenChange={closeForm}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Account</DialogTitle>
            <DialogDescription>Add or Edit Account</DialogDescription>
          </DialogHeader>

          {form.mode === "update" ? (
            <AccountUpdate account={form.account} onClose={closeForm} />
          ) : (
            <AccountCreate onClose={closeForm} />
          )}
        </DialogContent>
      </Dialog>

      <DeleteAccount />
    </div>
  );
}

export default AccountsPage;
