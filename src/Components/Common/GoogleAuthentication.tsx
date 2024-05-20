import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import React from 'react';
import { googleAuth, login } from '../../Api/userApi';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Redux/Slices/Auth';
import { useNavigate } from 'react-router-dom';

interface gLogin {
  Login: boolean;
}

interface DecodedToken {
  name: string;
  email: string;
  password: string;
  isGoogle: boolean;
}

const GoogleAuthentication: React.FC<gLogin> = ({ Login }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleSignUp = async (response: CredentialResponse) => {
    try {
      const result = jwtDecode<DecodedToken>(response.credential as string);

      const data = {
        name: result.name,
        email: result.email,
        password: 'Helping1!',
        isGoogle: true
      };

      if (!Login) {
        const response = await googleAuth(data.name, data.email, data.password);
        if (response?.data.success) {
          dispatch(setUserData(response.data.token));
          console.log('Google signup success');
          navigate('/');
        }
      } else {
        const response = await login(data.email, data.password);
        if (response?.data.success) {
          dispatch(setUserData(response.data.token));
          console.log('Google login success');
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error during Google authentication:', error);
    }
  };

  return (
    <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              googleSignUp(credentialResponse);
            }}
            onError={() => {
              console.log("Login failed!");
            }}
            type="icon"
          />
    </div>
  );
};

export default GoogleAuthentication;
