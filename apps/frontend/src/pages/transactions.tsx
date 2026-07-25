import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateTransaction from "@/features/transactions/components/create-transaction";
import TransactionFilter from "@/features/transactions/components/filter";
import TransactionList from "@/features/transactions/components/transaction-list";
import UpdateTransaction from "@/features/transactions/components/update-transaction";
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
                <UpdateTransaction
                  transaction={form.transaction}
                  onSuccess={closeForm}
                  onCancel={closeForm}
                />
              ) : (
                <CreateTransaction onSuccess={closeForm} onCancel={closeForm} />
              )}
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
export default Transactions;
