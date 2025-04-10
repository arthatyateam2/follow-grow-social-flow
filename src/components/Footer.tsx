
import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-flex items-center">
              <span className="text-xl font-bold instagram-gradient-text">FollowFlow</span>
            </Link>
            <p className="mt-3 text-gray-600 max-w-md">
              Grow your Instagram following organically by connecting with real users 
              who are interested in your content. No bots, no fake accounts.
            </p>
            <div className="mt-4 flex items-center space-x-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-900">About</a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-900">How it Works</a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-900">Pricing</a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-900">FAQ</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-900">Blog</a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-900">Terms of Service</a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-900">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6">
          <p className="text-gray-500 text-sm">
            &copy; {year} FollowFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
