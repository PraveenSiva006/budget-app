import TransactionFilter from "@/features/transactions/components/filter";
import TransactionList from "@/features/transactions/components/transaction-list";

function Transactions() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <TransactionFilter />
      </div>

      <div className="col-span-10 px-16">
        <TransactionList />
      </div>
    </div>
  );
}
export default Transactions;
