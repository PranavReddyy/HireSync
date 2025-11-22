import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    
    setLoggingOut(true);
    try {
      await logout();
      navigate('/');
      toast.success('Signed out successfully');
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Failed to sign out. Please try again.');
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <nav className="bg-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">HireSync</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-400 hover:text-white font-medium transition-colors text-sm"
            >
              Jobs
            </Link>
            <Link
              to="/saved-jobs"
              className="text-gray-400 hover:text-white font-medium transition-colors text-sm"
            >
              Saved
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-400 hover:text-white font-medium transition-colors text-sm"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                  </span>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="px-4 py-1.5 text-sm text-gray-400 hover:text-white font-medium transition-colors disabled:opacity-50"
                  >
                    {loggingOut ? 'Signing out...' : 'Sign out'}
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1.5 bg-white text-black rounded-lg hover:bg-gray-200 font-medium transition-all text-sm"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
