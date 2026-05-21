import { Button } from "@/components/ui/button";
import TransactionFilter from "@/features/transactions/components/filter";
import TransactionForm from "@/features/transactions/components/form";
import TransactionList from "@/features/transactions/components/transaction-list";
import { useTransactionUIStore } from "@/features/transactions/transaction.store";
import { useGetTransactions } from "@/features/transactions/use-transaction-actions";

function Transactions() {
  const { data: transactions, isLoading } = useGetTransactions();

  const form = useTransactionUIStore((state) => state.form);
  const handleActions = useTransactionUIStore((state) => state.handleActions);

  const closeForm = useTransactionUIStore((state) => state.closeForm);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <TransactionFilter />
      </div>

      {!isLoading && (
        <div className="col-span-10 px-16">
          <Button onClick={() => handleActions({ type: "create" })}>Add</Button>
          <Button onClick={closeForm}>Close</Button>

          <TransactionList list={transactions!} />
          {form.mode === "create" && <TransactionForm />}
        </div>
      )}
    </div>
  );
}
export default Transactions;
