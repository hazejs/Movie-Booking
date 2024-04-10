import Lottie from 'react-lottie';
import { defaultOptions, mB50 } from '../../utils/js-styles';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { registerUser } from '../../store/authSlice';
import {
  LOGIN,
  LOGIN_SUBTITLE,
  LOGIN_TITLE,
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from '../../utils/consts';
import { toast } from 'react-toastify';

interface ComponentProps {}

type FormData = {
  email: string;
  password: string;
  username: string;
  isAdmin: boolean;
};

const RegisterComponent: React.FC<ComponentProps> = ({}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    username: '',
    isAdmin: false,
  });

  const { email, password, username, isAdmin } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'isAdmin') {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const register = async () => {
    try {
      await dispatch(registerUser({ email, password, username, isAdmin }));
    } catch (error) {
      toast(REGISTER_FAILURE);
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
                required
                style={mB50}
                name='email'
                value={email}
                type='email'
                id='standard-basic'
                label='Email'
                variant='standard'
                onChange={onChange}
              />

              <TextField
                required
                style={mB50}
                name='password'
                value={password}
                type='password'
                id='standard-basic'
                label='Password'
                variant='standard'
                onChange={onChange}
              />

              <TextField
                required
                style={mB50}
                name='username'
                value={username}
                id='standard-basic'
                label='Username'
                variant='standard'
                onChange={onChange}
              />

              <FormControlLabel
                required
                control={
                  <Checkbox
                    color='secondary'
                    onChange={onChange}
                    name='isAdmin'
                    value={isAdmin}
                    checked={isAdmin}
                  />
                }
                label='isAdmin'
              />

              <div className='form-btn-container'>
                <button onClick={register}>{REGISTER}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
