import { supabase } from '../supabaseClient';

export default function GoogleLoginButton({ text = 'signin_with' }) {
  return (
    <div className="google-login-control">
      <button
        type="button"
        className="google-login-button"
        onClick={() => supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: window.location.origin },
        })}
      >
        {text === 'signup_with' ? 'Sign up with Google' : 'Sign in with Google'}
      </button>
    </div>
  );
}