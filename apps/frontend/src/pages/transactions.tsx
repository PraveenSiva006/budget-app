import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TransactionCreateForm from "@/features/transactions/components/create-form";
import TransactionFilter from "@/features/transactions/components/filter";
import TransactionList from "@/features/transactions/components/transaction-list";
import TransactionUpdateForm from "@/features/transactions/components/update-form";
import { useTransactionUIStore } from "@/features/transactions/transaction.store";
import { useGetTransactions } from "@/features/transactions/use-transaction-actions";

function Transactions() {
  const { data: transactions, isLoading } = useGetTransactions();

  const form = useTransactionUIStore((state) => state.form);
  const handleActions = useTransactionUIStore((state) => state.handleActions);

  const closeForm = useTransactionUIStore((state) => state.closeForm);

  return (
    <div className="grid grid-cols-12 app-container mx-auto">
      <div className="col-span-2">
        <TransactionFilter />
      </div>

      {!isLoading && (
        <div className="col-span-10 pl-16">
          <Button onClick={() => handleActions({ type: "create" })}>Add</Button>
          <Button onClick={closeForm}>Close</Button>

          <TransactionList list={transactions!} />

          <Dialog open={form.mode !== "closed"} onOpenChange={closeForm}>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Transaction</DialogTitle>
                <DialogDescription>
                  {form.mode === "create" ? "Add" : "Edit"} Transaction
                </DialogDescription>
              </DialogHeader>
              {form.mode === "update" ? (
                <TransactionUpdateForm
                  transaction={form.transaction}
                  onSuccess={closeForm}
                  onCancel={closeForm}
                />
              ) : (
                <TransactionCreateForm
                  onSuccess={closeForm}
                  onCancel={closeForm}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
export default Transactions;
