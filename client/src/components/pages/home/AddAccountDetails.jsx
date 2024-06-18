import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { addAccount } from '../../../redux/accountslice';

const validationSchema = yup.object().shape({
  account_no: yup.string().required('Account number is required'),
  branch: yup.string().required('Branch is required'),
  ifsc_code: yup.string().required('IFSC code is required'),
  balance: yup.number().required('Balance is required').positive('Balance must be a positive number'),
});

const AddAccountDetails = ({ open, handleClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.account);

  const onSubmit = async (data) => {
    try {
      await dispatch(addAccount(data));
      handleClose(); 
    } catch (err) {
      console.error('Error adding account details:', err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Account Details</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Account Number"
            {...register('account_no')}
            error={!!errors.account_no}
            helperText={errors.account_no?.message}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Branch"
            {...register('branch')}
            error={!!errors.branch}
            helperText={errors.branch?.message}
            fullWidth
            margin="dense"
          />
          <TextField
            label="IFSC Code"
            {...register('ifsc_code')}
            error={!!errors.ifsc_code}
            helperText={errors.ifsc_code?.message}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Balance"
            type="number"
            {...register('balance')}
            error={!!errors.balance}
            helperText={errors.balance?.message}
            fullWidth
            margin="dense"
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Saving...' : 'Add '}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccountDetails;
