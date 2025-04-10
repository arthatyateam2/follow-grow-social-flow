
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    instagramHandle: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        // Sign in the user
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        
        navigate("/dashboard");
      } else {
        // Sign up the user
        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              username: formData.username || formData.email.split('@')[0],
              instagram_handle: formData.instagramHandle,
            },
          },
        });
        
        if (signUpError) throw signUpError;
        
        // Update profile with Instagram handle
        if (formData.instagramHandle) {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            // Using type assertion to work with our table
            const { error: updateError } = await supabase
              .from('profiles')
              .update({ 
                instagram_handle: formData.instagramHandle,
                username: formData.username || formData.email.split('@')[0]
              } as any)
              .eq('id', user.id);
              
            if (updateError) console.error("Error updating profile:", updateError);
          }
        }
        
        toast({
          title: "Account created!",
          description: "You've successfully signed up.",
        });
        
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold instagram-gradient-text">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin 
              ? "Enter your details to access your dashboard" 
              : "Start growing your Instagram followers today"}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                />
              </div>
            )}
            
            {!isLogin && (
              <div>
                <label htmlFor="instagramHandle" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
          </div>
          
          <div>
            <Button 
              type="submit" 
              className="w-full bg-instagram-purple hover:bg-opacity-90"
              disabled={loading}
            >
              {loading ? "Processing..." : (isLogin ? "Sign in" : "Create account")}
            </Button>
          </div>
        </form>
        
        <div className="text-center">
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
      </div>
    </div>
  );
};

export default Auth;
