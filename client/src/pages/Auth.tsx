import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import RegisterComponent from '../components/auth/Register';
import LoginComponent from '../components/auth/Login';
import { LOGIN, REGISTER } from '../utils/consts';
import { tabStyle } from '../utils/js-styles';
import { Router, useNavigate } from 'react-router-dom';

interface ComponentProps {}

const AuthPage: React.FC<ComponentProps> = ({}) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [value, setValue] = useState<string>(LOGIN);
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const renderContent = () => {
    if (value === LOGIN) return <LoginComponent />;
    if (value === REGISTER) return <RegisterComponent />;
  };

  return (
    <div className='auth-page-container'>
      <div className='bubble-1'></div>
      <div className='bubble-2'></div>
      <div className='square-1'></div>
      <div className='tabs-container'>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor='secondary'
          indicatorColor='secondary'
          aria-label='secondary tabs'
        >
          <Tab style={tabStyle} value={LOGIN} label='Login' />
          <Tab style={tabStyle} value={REGISTER} label='Register' />
        </Tabs>
      </div>

      {renderContent()}
    </div>
  );
};

export default AuthPage;
