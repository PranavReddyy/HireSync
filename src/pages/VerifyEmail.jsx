import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
  const { user, resendVerification } = useAuth();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleResend = async () => {
    if (!user?.email) return;
    
    setSending(true);
    setMessage('');
    
    try {
      await resendVerification(user.email);
      setMessage('Verification email sent! Please check your inbox.');
    } catch (err) {
      setMessage(err.message || 'Failed to send verification email');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Verify your email
          </h2>
          <p className="text-gray-400 mb-6">
            We've sent a verification link to <strong className="text-white">{user?.email}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Check your inbox and click the link to verify your account.
          </p>

          {message && (
            <div className={`mb-6 p-4 rounded-xl backdrop-blur-xl ${
              message.includes('sent') 
                ? 'bg-white/10 text-white border border-white/20' 
                : 'bg-white/5 text-gray-300 border border-white/10'
            }`}>
              {message}
            </div>
          )}

          <button
            onClick={handleResend}
            disabled={sending}
            className="w-full mb-4 px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-200 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? 'Sending...' : 'Resend verification email'}
          </button>

          <Link
            to="/login"
            className="text-sm text-gray-400 hover:text-white font-medium transition-colors"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
