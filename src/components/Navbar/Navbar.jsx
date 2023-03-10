import './styles.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coffeeIcon from '../../images/coffeeIcon.png';
import Profile from '@mui/icons-material/AccountCircle';
import Location from '@mui/icons-material/LocationOnSharp';
import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';
import { EditProfile } from '../EditProfile/EditProfile';
import LocationModal from '../Location/LocationModal';
import { AuthContext } from '../../context/AuthContext';
import Home from '@mui/icons-material/Home';

export const Navbar = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [currentModal, setCurrentModal] = useState('');

  const navigateToAbout = () => {
    navigate('/AboutUs');
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const handleSwitchModal = (modalName) => {
    setCurrentModal(modalName);
  };

  return (
    <>
      <nav>
        <div
          className='nav-section'
          id='footer-logo-section'
        >
          <button
            className='nav-button'
            onClick={navigateToHome}
          >
            <Home
              style={{
                color: 'white',
              }}
              fontSize='large'
            />
          </button>
        </div>

        <div className='nav-section'>
          <button
            className='nav-button'
            onClick={navigateToAbout}
          >
            <img
              id='logo-icon'
              src={coffeeIcon}
              alt='logo'
              width='40px'
            />
          </button>
        </div>

        <div className='nav-section'>
          <button
            className='nav-button'
            onClick={() => handleSwitchModal('location')}
          >
            <Location
              fontSize='large'
              style={{ color: 'white' }}
            />
          </button>
        </div>

        <div className='nav-section'>
          <button
            className='nav-button'
            onClick={() => handleSwitchModal('signIn')}
          >
            {authContext.loggedIn && authContext.user?.picture ? (
              <img
                className='curr-user-image'
                src={authContext.user?.picture}
                alt=''
              />
            ) : (
              <Profile
                fontSize='large'
                style={{ color: 'white' }}
              />
            )}
          </button>
        </div>
      </nav>
      {currentModal === 'location' && (
        <LocationModal handleSwitchModal={handleSwitchModal} />
      )}
      {currentModal === 'signIn' && (
        <SignIn handleSwitchModal={handleSwitchModal} />
      )}
      {currentModal === 'signUp' && (
        <SignUp handleSwitchModal={handleSwitchModal} />
      )}
      {currentModal === 'editProfile' && (
        <EditProfile handleSwitchModal={handleSwitchModal} />
      )}
    </>
  );
};
