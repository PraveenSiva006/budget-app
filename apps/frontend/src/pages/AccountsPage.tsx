import AccountForm from "@/features/accounts/components/AccountForm";
import AccountsList from "@/features/accounts/components/AccountsList";
import { useState } from "react";

function AccountsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <div>
      <div className="px-5 pt-2 pb-3 text-xl">Accounts</div>
      <AccountsList onAdd={openForm} />
      <AccountForm open={isFormOpen} closeForm={closeForm} />
    </div>
  );
}

export default AccountsPage;
