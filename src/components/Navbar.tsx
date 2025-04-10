
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  onAuthClick?: () => void;
}

const Navbar = ({ onAuthClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleAuthButtonClick = () => {
    if (onAuthClick) {
      onAuthClick();
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold instagram-gradient-text">FollowFlow</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Home
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              How it Works
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Discover
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  Dashboard
                </Link>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleAuthButtonClick}>
                  Sign In
                </Button>
                <Button 
                  className="bg-instagram-purple hover:bg-opacity-90"
                  onClick={handleAuthButtonClick}
                >
                  Get Started
                </Button>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link 
              to="/" 
              className="block text-gray-600 hover:text-gray-900 text-base font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/" 
              className="block text-gray-600 hover:text-gray-900 text-base font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link 
              to="/dashboard" 
              className="block text-gray-600 hover:text-gray-900 text-base font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Discover
            </Link>
            
            <div className="pt-2 space-y-3">
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="block text-gray-600 hover:text-gray-900 text-base font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button variant="outline" className="w-full" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full" onClick={handleAuthButtonClick}>
                    Sign In
                  </Button>
                  <Button 
                    className="w-full bg-instagram-purple hover:bg-opacity-90"
                    onClick={handleAuthButtonClick}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
