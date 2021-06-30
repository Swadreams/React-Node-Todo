import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from '../helper/validator';
import image1 from '../../src/img/log.svg';
import image2 from '../../src/img/register.svg';
import { signInAsync, signUpAsync } from '../redux/auth/authAsync';
import { clearAuthError } from '../redux/errorSlice';
import { clearAuthMessage } from '../redux/auth/authSlice';
import Loader from './loader/Loader';

import './LoginPageStyle.css';

interface IValidation {
  email?: boolean;
  password?: boolean;
}

const LoginPage = (props: any) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const authError = useSelector(
    (state: any) => state.errors.authError?.message
  );
  const authSuccess = useSelector((state: any) => state.auth.message);
  const isLoading = useSelector((state: any) => state.auth.loading);
  const isSignedIn = useSelector((state: any) => state.auth.isSignedIn);
  const [validation, setValidation] = useState<IValidation | null>(null);

  const checkEmailValidation = (email: string) => {
    setValidation({
      email: validateEmail(email),
    });
  };

  useEffect(() => {
    if (isSignedIn) {
      props.history.push('/todos');
    }
  }, [isSignedIn, props.history]);

  const signUpMode = () => {
    const container = document.querySelector('.container');
    container?.classList.add('sign-up-mode');
    clearError();
  };

  const signInMode = () => {
    const container = document.querySelector('.container');
    container?.classList.remove('sign-up-mode');
    clearError();
    clearSuccess();
  };

  const clearError = () => {
    if (authError) {
      dispatch(clearAuthError(null));
    }
    checkEmailValidation(username);
  };

  const clearSuccess = () => {
    if (authSuccess) {
      dispatch(clearAuthMessage());
    }
  };

  const signInClick = (event: FormEvent) => {
    event.preventDefault();
    dispatch(signInAsync({ username, password }));
  };

  const onSignUp = (event: FormEvent) => {
    event.preventDefault();
    dispatch(
      signUpAsync({
        email: username,
        name: firstName,
        phone,
        password,
      })
    );
  };

  const renderError = (error: string) => {
    if (error) {
      return (
        <div className='col-6 login-error-message'>
          <i className='fa fa-exclamation-triangle'></i> {error}
        </div>
      );
    }
    return null;
  };

  const renderSuccess = (message: string) => {
    if (message) {
      return (
        <>
          <div className='col-6 auth-success-message'>
            <h2>
              <i className='fa fa-check'></i> {message}
            </h2>
            <p>Click on sign in button to login</p>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className='container custom-login'>
      {isLoading && <Loader />}
      <div className='forms-container'>
        <div className='signin-signup'>
          <form className='app-form sign-in-form' onSubmit={signInClick}>
            <h2 className='title'>Sign in</h2>
            {renderError(authError)}
            <div className='input-field'>
              <i className='fa fa-envelope'></i>
              <input
                type='text'
                placeholder='Email'
                onBlur={clearError}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {!validation?.email ? (
              <div className='alert text-danger'>Please enter valid email</div>
            ) : null}
            <div className='input-field'>
              <i className='fa fa-lock'></i>
              <input
                type='password'
                placeholder='Password'
                onBlur={clearError}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type='submit'
              value='Login'
              className='btn btn-app solid'
              disabled={!validation?.email || !password}
            >
              Login
            </button>
            {/* <p className='social-text'>Or Sign in with social platforms</p>
            <div className='social-media'>
              <a href='#' className='social-icon'>
                <i className='fa fa-facebook-f'></i>
              </a>
              <a href='#' className='social-icon'>
                <i className='fa fa-twitter'></i>
              </a>
              <a href='#' className='social-icon'>
                <i className='fa fa-google'></i>
              </a>
              <a href='#' className='social-icon'>
                <i className='fa fa-linkedin-in'></i>
              </a>
            </div> */}
          </form>
          {authSuccess && renderSuccess(authSuccess)}
          {!authSuccess && (
            <form className='app-form sign-up-form' onSubmit={onSignUp}>
              <h2 className='title'>Sign up</h2>
              {renderError(authError)}
              {renderSuccess(authSuccess)}
              <div className='input-field'>
                <i className='fa fa-user'></i>
                <input
                  type='text'
                  placeholder='Name'
                  onBlur={clearError}
                  maxLength={20}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className='input-field'>
                <i className='fa fa-phone'></i>
                <input
                  type='text'
                  placeholder='Phone'
                  maxLength={10}
                  onBlur={clearError}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className='input-field'>
                <i className='fa fa-envelope'></i>
                <input
                  type='email'
                  placeholder='Email'
                  maxLength={50}
                  onBlur={clearError}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='input-field'>
                <i className='fa fa-lock'></i>
                <input
                  type='password'
                  placeholder='Password'
                  maxLength={10}
                  onBlur={clearError}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input type='submit' className='btn btn-app' value='Sign up' />
              {/* <p className='social-text'>Or Sign up with social platforms</p>
            <div className='social-media'>
              <a href='#' className='social-icon'>
                <i className='fa fa-facebook-f'></i>
              </a>
              <a href='#' className='social-icon'>
                <i className='fa fa-twitter'></i>
              </a>
              <a href='#' className='social-icon'>
                <i className='fa fa-google'></i>
              </a>
              <a href='#' className='social-icon'>
                <i className='fa fa-linkedin-in'></i>
              </a>
            </div> */}
            </form>
          )}
        </div>
      </div>

      <div className='panels-container'>
        <div className='panel left-panel'>
          <div className='content'>
            <h3>New here ?</h3>
            <p>Create an account and start writing your todos</p>
            <button
              className='btn btn-app transparent'
              id='sign-up-btn'
              onClick={signUpMode}
            >
              Sign up
            </button>
          </div>
          <img src={image1} className='image' alt='' />
        </div>
        <div className='panel right-panel'>
          <div className='content'>
            <h3>One of us ?</h3>
            <p>
              Login with your email, password and see what is in your todo list
            </p>
            <button
              className='btn btn-app transparent'
              id='sign-in-btn'
              onClick={signInMode}
            >
              Sign in
            </button>
          </div>
          <img src={image2} className='image' alt='' />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
