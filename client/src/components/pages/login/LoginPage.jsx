  import React from 'react';
  import { useForm } from 'react-hook-form';
  import { yupResolver } from '@hookform/resolvers/yup';
  import * as yup from 'yup';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  // import './LoginForm.css';

  const validationSchema = yup.object().shape({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(validationSchema)
    });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
      try {
        const response = await axios.post('http://localhost:7100/user/login', data);
        const { access_token, result } = response.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('userId', result._id)
        localStorage.setItem("role", result.role);

        alert('Login successful!');
        if ( result.role === 'admin') {
          navigate('/admin_dashboard'); 
        } else {
          navigate('/'); 
        }
        } catch (error) {
        console.error('There was an error!', error);
        alert('Invalid credentials');
      }
    };

    return (
      <div className="form-container" style={{ marginTop: "10%"}}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email</label>
            <input {...register('email')} />
            <p>{errors.email?.message}</p>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" {...register('password')} />
            <p>{errors.password?.message}</p>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

  export default LoginPage;
