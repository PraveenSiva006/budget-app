import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AccountForm from "@/features/accounts/components/AccountForm";
import AccountsList from "@/features/accounts/components/AccountsList";
import type { AccountDTO } from "@budget/contracts";
import { useState } from "react";

function AccountsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<AccountDTO | null>(null);

  const openForm = () => setIsFormOpen(true);

  const closeForm = () => setIsFormOpen(false);

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
    <>
      <AccountsList
        accounts={accounts}
        onAdd={openForm}
        onEdit={(account) => {
          setEditItem(account);
          openForm();
        }}
      />

      <Dialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditItem(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Account</DialogTitle>
            <DialogDescription>Add or Edit Account</DialogDescription>
          </DialogHeader>

          <AccountForm editItem={editItem} closeForm={closeForm} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AccountsPage;
