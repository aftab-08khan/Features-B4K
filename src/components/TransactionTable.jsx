export default function TransactionTable({ data }) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Franchise</th>

          <th>Type</th>

          <th>Amount</th>

          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.franchise}</td>

            <td>{item.type}</td>

            <td>AED {item.amount}</td>

            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
