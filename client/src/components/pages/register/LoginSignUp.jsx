
import React, { useState } from 'react';
import './LoginSignUpP.css';
import { BiSolidUser } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail }from 'react-icons/md';

const LoginSignUp = () => {
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = () => {
    if (state === 'Login') {
      // Perform login action here
    } else {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

      localStorage.setItem('isSignedUp', true);


      // Optionally, you can clear the input fields after saving the data.
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{state}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {state === 'Login' ? (
          <div></div>
        ) : (
          <div className='input'>
            <BiSolidUser className='icon' />
            <input
              type="text"
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className='input'>
          <MdEmail className='icon' />
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input'>
          <RiLockPasswordFill className='icon' />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {state === 'Sign Up' ? (
        <div></div>
      ) : (
        <div className='forgot-password'>
          Lost Password? <span>Click Here!</span>
        </div>
      )}

      <div className='submit-container'>
        <div
          className={state === 'Login' ? 'submit gray' : 'submit'}
          onClick={() => {
            setState('Sign Up');
            handleFormSubmit();
          }}
        >
          Sign Up
        </div>
        <div
          className={state === 'Sign Up' ? 'submit gray' : 'submit'}
          onClick={() => {
            setState('Login');
            handleFormSubmit();
            
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
