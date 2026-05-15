export default function TransactionList() {
  const date = new Date();
  return (
    <div className="border flex px-6 py-4 rounded-lg">
      <span>Category</span>
      <div className="ml-auto">
        <div>50₹</div>
        <div>{date.toLocaleDateString()}</div>
      </div>
    </div>
  );
}
