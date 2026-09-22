import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function GoogleLoginButton({ text = 'signin_with' }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSuccess = (credentialResponse) => {
    try {
      const profile = jwtDecode(credentialResponse.credential);
      if (!profile.email) throw new Error('Google did not return an email address.');
      login({
        id: profile.sub,
        name: profile.name || profile.email.split('@')[0],
        email: profile.email,
        picture: profile.picture || '',
      });
      setErrorMessage('');
      navigate('/catalog');
    } catch {
      setErrorMessage('Google sign-in could not be completed. Please try again.');
    }
  };

  return (
    <div className="google-login-control">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => setErrorMessage('Google sign-in could not be completed. Please try again.')}
        theme="filled_black"
        shape="rectangular"
        size="medium"
        text={text}
      />
      {errorMessage && <p className="google-login-error" role="alert">{errorMessage}</p>}
    </div>
  );
}