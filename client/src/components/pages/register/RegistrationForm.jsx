import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './RegistrationForm.css';

const validationSchema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  gender: yup.string().oneOf(['male', 'female'], 'Select a valid gender').required('Gender is required'),
  date_of_birth: yup.date().required('Date of Birth is required').typeError('Enter a valid date'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  image: yup.mixed().required('Profile picture is required')
});

const RegistrationForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const watchImage = watch('image', []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('gender', data.gender);
    formData.append('date_of_birth', data.date_of_birth);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('image', data.image[0]);

    try {
      const response = await axios.post('http://localhost:7100/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.message);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('There was an error!', error);
      alert('Oops! Process failed, please contact admin.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input {...register('first_name')} />
            <p>{errors.first_name?.message}</p>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input {...register('last_name')} />
            <p>{errors.last_name?.message}</p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Gender</label>
            <select {...register('gender')}>
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <p>{errors.gender?.message}</p>
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" {...register('date_of_birth')} />
            <p>{errors.date_of_birth?.message}</p>
          </div>
        </div>
        <div className="form-row">
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
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Profile Picture</label>
            <input type="file" {...register('image')} onChange={handleImageChange} />
            <p>{errors.image?.message}</p>
          </div>
        </div>
        {imagePreview && (
          <div className="form-row">
            <div className="form-group">
              <img src={imagePreview} alt="Profile Preview" className="image-preview" style={{ width: "100px", height: "150px", marginLeft: "200px" }} />
            </div>
          </div>
        )}
        <div className='reg-para'>
         <p style={{color: "black"}}>Already have an account?<Link to='/login' className='reg-link'>Login</Link></p>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
