import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  account_no: yup.string().required('Account number is required'),
  branch: yup.string().required('Branch is required'),
  ifsc_code: yup.string().required('IFSC code is required'),
  balance: yup.number().required('Balance is required').positive('Balance must be positive')
});

const AddAccountDetails = ({ onAddAccount }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    const userId = localStorage.getItem('userId');
    onAddAccount({ ...data, user: userId });
  };

  return (
    <div style={{ width:"360px"}}>

    
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Account Number</label>
        <input {...register('account_no')} />
        <p>{errors.account_no?.message}</p>
      </div>
      <div>
        <label>Branch</label>
        <input {...register('branch')} />
        <p>{errors.branch?.message}</p>
      </div>
      <div>
        <label>IFSC Code</label>
        <input {...register('ifsc_code')} />
        <p>{errors.ifsc_code?.message}</p>
      </div>
      <div>
        <label>Balance</label>
        <input type="number" {...register('balance')} />
        <p>{errors.balance?.message}</p>
      </div>
      <button type="submit">Add Account</button>
    </form>
    </div>
  );
};

export default AddAccountDetails;
