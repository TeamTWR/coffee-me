import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import usePost from '../../hooks/crud/usePost';
import { ProfileModal } from '../ProfileModal/ProfileModal';
import './styles.css';

export const SignIn = (props) => {
  const authContext = useContext(AuthContext);

  const { postData, responseData, loading, error } = usePost('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogout = () => {
    authContext.onLogout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      postData({
        email,
        password,
      });
    } catch (err) {
      setErrorMessage(err.response.data.error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading && responseData?.token) {
      authContext.onLogin(responseData.user, responseData.token);
      console.log('Logged in successfully!');
    }

    if (error) {
      setErrorMessage(error?.response?.data?.error);
    }
  }, [responseData, error]);

  return (
    <div
      className='modal'
      onClick={() => props.handleSwitchModal('')}
    >
      <div
        className='signIn-container'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='close-box'>
          <div className='wrap-button'>
            <button
              className='close-button'
              onClick={() => props.handleSwitchModal('')}
            >
              &times;
            </button>
          </div>
        </div>
        {authContext.loggedIn ? (
          <div className='logged-container'>
            <ProfileModal />
            <div className='submit-button-group'>
              <button
                id='submit'
                onClick={() => props.handleSwitchModal('editProfile')}
              >
                Edit
              </button>
              <button
                id='submit'
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 id='signIn-title'>Sign In</h1>
            <form
              className='signIn-form'
              onSubmit={handleSubmit}
            >
              <div className='label-title'>
                <label id='email'>Email:</label>
              </div>
              <input
                id='email-input'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className='label-title'>
                <label id='password'>Password:</label>
              </div>
              <input
                id='password-input'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && <div id='error'>{errorMessage}</div>}
              <div className='sign-up-now'>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    props.handleSwitchModal('signUp');
                  }}
                >
                  Not a user? Sign up now!
                </button>
              </div>
              <div className='submit-button-group'>
                <button
                  type='submit'
                  id='submit'
                >
                  Sign In
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
