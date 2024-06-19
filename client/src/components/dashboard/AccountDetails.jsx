// components/AccountDetails.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountDetails = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.post('http://localhost:7100/api/getaccountDetails');
        setAccounts(response.data.data);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    fetchAccountDetails();
  }, []);

  const handleDeposit = async (accountId) => {
    try {
      const amount = prompt('Enter deposit amount:');
      if (!amount || isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
      }

      const response = await axios.post('http://localhost:7100/api/deposit', {
        accountId,
        amount: parseFloat(amount),
      });

      console.log('Deposit response:', response.data);
      // You can update the account details after successful deposit if needed
    } catch (error) {
      console.error('Error depositing funds:', error);
      alert('Failed to deposit funds. Please try again.');
    }
  };

  const handleWithdraw = async (accountId) => {
    try {
      const amount = prompt('Enter withdrawal amount:');
      if (!amount || isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
      }

      const response = await axios.post('http://localhost:7100/api/withdraw', {
        accountId,
        amount: parseFloat(amount),
      });

      console.log('Withdrawal response:', response.data);
      // You can update the account details after successful withdrawal if needed
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      alert('Failed to withdraw funds. Please try again.');
    }
  };

  return (
    <div>
      <h2>Account Details</h2>
      {accounts.length === 0 ? (
        <p>No accounts found</p>
      ) : (
        accounts.map(account => (
          <div key={account._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <p>Account Number: {account.account_no}</p>
            <p>Branch: {account.branch}</p>
            <p>IFSC Code: {account.ifsc_code}</p>
            <p>Balance: {account.balance}</p>
            <button onClick={() => handleDeposit(account._id)}>Deposit</button>
            <button onClick={() => handleWithdraw(account._id)}>Withdraw</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AccountDetails;
