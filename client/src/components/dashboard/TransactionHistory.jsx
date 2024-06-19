import React from 'react';

const TransactionHistory = () => {
  // Mock transaction data (replace with your actual data structure)
  const transactions = [
    { id: 1, type: 'deposit', amount: 100, balanceAfter: 1000 },
    { id: 2, type: 'withdrawal', amount: 50, balanceAfter: 950 },
    { id: 3, type: 'deposit', amount: 200, balanceAfter: 1150 },
    { id: 4, type: 'withdrawal', amount: 75, balanceAfter: 1075 },
  ];

  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.type}: {transaction.amount} - Balance after: {transaction.balanceAfter}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
