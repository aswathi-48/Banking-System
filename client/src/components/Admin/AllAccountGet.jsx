// AllAccountGet.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { fetchAllAccounts } from '../../redux/accountslice';

const AllAccountGet = () => {
  const dispatch = useDispatch();
  const { accounts, status, error } = useSelector(state => state.account);
console.log("account",accounts);
  useEffect(() => {
    dispatch(fetchAllAccounts());
  }, [dispatch]);

  const columns = [
    {
        field: 'id', headerName: 'ID', width: 70,
        renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    { field: 'account_no', headerName: 'Account No', width: 150 },
    { field: 'branch', headerName: 'Branch', width: 150 },
    { field: 'balance', headerName: 'Balance', width: 150 },
    { field: 'ifsc_code', headerName: 'IFSC Code', width: 150 },
    { field: 'user', headerName: 'User', width: 200, renderCell: (params) => params.row.user?.first_name || 'N/A' },
  ];

  const getRowId = (row) => row._id;

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>All Accounts</h1>
      <DataGrid rows={accounts} columns={columns} pageSize={5} getRowId={getRowId} />
    </div>
  );
};

export default AllAccountGet;
