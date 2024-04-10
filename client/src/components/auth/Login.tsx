import Lottie from 'react-lottie';
import { defaultOptions, mB50 } from '../../utils/js-styles';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../store/store';
import { loginUser } from '../../store/authSlice';
import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUBTITLE,
  LOGIN_SUCCESS,
  LOGIN_TITLE,
} from '../../utils/consts';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate, useNavigation } from 'react-router-dom';

interface ComponentProps {}

type FormData = {
  email: string;
  password: string;
};

const LoginComponent: React.FC<ComponentProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const { isAuthenticated, error } = useSelector(
    (state: RootState) => state.auth
  );
  const { email, password } = formData;

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const login = async () => {
    try {
      if (email && password) {
        await dispatch(loginUser({ email, password }));
      }
    } catch (error) {
      toast(LOGIN_FAILURE);
    }
  };

  return (
    <div className='login-component-container'>
      <div className='form-container'>
        <div className='form-wrapper-container'>
          <div className='form-wrapper'>
            <div className='lottie-container'>
              <Lottie options={defaultOptions} height={200} width={200} />
            </div>
            <h1 className='form-title'>{LOGIN_TITLE}</h1>
            <p className='form-subtitle'>{LOGIN_SUBTITLE}</p>

            <div className='form-inputs-container'>
              <TextField
                style={mB50}
                name='email'
                value={email}
                type='email'
                id='standard-basic'
                label='Email'
                variant='standard'
                onChange={onChange}
                InputLabelProps={{ style: { fontSize: 20 } }}
              />

              <TextField
                name='password'
                value={password}
                type='password'
                id='standard-basic'
                label='Password'
                variant='standard'
                onChange={onChange}
                InputLabelProps={{ style: { fontSize: 20 } }}
              />

              <div className='form-btn-container'>
                <button onClick={login}>{LOGIN}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
