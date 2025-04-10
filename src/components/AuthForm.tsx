
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram } from "lucide-react";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    instagramHandle: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle authentication
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold instagram-gradient-text">
          {isLogin ? "Sign in to your account" : "Create your account"}
        </h2>
        <p className="text-gray-600 mt-2">
          {isLogin 
            ? "Enter your details to access your dashboard" 
            : "Start growing your Instagram followers today"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>
        
        {!isLogin && (
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
            />
          </div>
        )}
        
        {!isLogin && (
          <div>
            <label htmlFor="instagramHandle" className="block text-sm font-medium text-gray-700 mb-1">
              Instagram Handle
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                @
              </div>
              <Input
                id="instagramHandle"
                name="instagramHandle"
                type="text"
                value={formData.instagramHandle}
                onChange={handleChange}
                className="pl-8"
                placeholder="your_instagram_username"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Adding your Instagram handle helps others find and follow you
            </p>
          </div>
        )}
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
            value={formData.password}
            onChange={handleChange}
            placeholder={isLogin ? "Your password" : "Create a password"}
          />
        </div>
        
        <Button type="submit" className="w-full bg-instagram-purple hover:bg-opacity-90">
          {isLogin ? "Sign in" : "Create account"}
        </Button>
        
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-purple-600 hover:text-purple-800"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
