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
import { useListTransaction } from "@/features/transactions/hooks/use-transaction-actions";
import { useTransactionUIStore } from "@/features/transactions/transaction.store";

function Transactions() {
  const { data: transactions, isLoading } = useListTransaction();

  const form = useTransactionUIStore((state) => state.form);

  const closeForm = useTransactionUIStore((state) => state.closeForm);

  return (
    <div className="grid grid-cols-12 app-container mx-auto">
      <div className="col-span-2">
        <TransactionFilter />
      </div>

      {!isLoading && (
        <div className="col-span-10 pl-16">
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
                  onClose={closeForm}
                />
              ) : (
                <CreateTransaction onClose={closeForm} />
              )}
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
export default Transactions;
