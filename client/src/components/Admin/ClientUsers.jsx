
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { deleteClientUser, fetchClientUsers } from '../../redux/clientUserSlice';
import { Button } from '@mui/material';

const ClientUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.clientUsers.users);
  const status = useSelector((state) => state.clientUsers.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchClientUsers());
    }
  }, [dispatch, status]);


  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteClientUser(userId));
    }
  };

  const columns = [
    {
      field: 'id', headerName: 'ID',
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
  },
  // { field: 'image', headerName: 'image ', width: 100,
  //   renderCell: (users) => {
  //     return <>
  //     <img src={users.row.image} alt="user" style={{ width: '50px', height: 'auto', borderRadius: "50px" }} />
  
  //     </>
  //   }
  //  },
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'gender', headerName: 'Gender', width: 250 },
    { field: 'date_of_birth', headerName: 'Date Of Birth', width: 100,
      renderCell: (params) => (
        <>
            {new Date(params.row.date_of_birth).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            })}
        </>
    ), },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </>
      ),
    },

  ];

  const getRowId = (row) => row._id;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={users} columns={columns} pageSize={5} getRowId={getRowId}/>
    </div>
  );
};

export default ClientUsers;
