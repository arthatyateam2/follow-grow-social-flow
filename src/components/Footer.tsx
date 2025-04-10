
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
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">About</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">How it Works</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">FAQ</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">Blog</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">Terms of Service</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">Contact</Link>
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
