
import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ProfileCard from "@/components/ProfileCard";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, UserPlus, TrendingUp, Activity } from "lucide-react";
import StatsCard from "@/components/StatsCard";

const profiles = [
  {
    username: "travel_addict",
    followers: 2456,
    following: 867,
    avatar: "https://i.pravatar.cc/150?img=32",
    category: "Travel"
  },
  {
    username: "food_lover_92",
    followers: 1280,
    following: 432,
    avatar: "https://i.pravatar.cc/150?img=26",
    category: "Food & Dining"
  },
  {
    username: "fitness_guru",
    followers: 5487,
    following: 1023,
    avatar: "https://i.pravatar.cc/150?img=33",
    category: "Fitness",
    isFollowing: true
  },
  {
    username: "photo_master",
    followers: 3421,
    following: 531,
    avatar: "https://i.pravatar.cc/150?img=48",
    category: "Photography"
  }
];

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <HowItWorks />
        
        {/* Discover Profiles Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Discover Profiles to Follow
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Connect with these Instagram users to start growing your own following.
                Remember, for every 2-3 profiles you follow, you'll gain a new follower.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {profiles.map((profile, index) => (
                <ProfileCard key={index} {...profile} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                className="bg-instagram-purple hover:bg-opacity-90"
                onClick={() => setIsAuthModalOpen(true)}
              >
                View More Profiles
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <p className="mt-4 text-sm text-gray-500">
                Sign in to see more profiles tailored to your interests
              </p>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold">Platform Statistics</h2>
                <p className="text-gray-600 mt-2">
                  Real numbers showing how our community is growing
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard 
                  title="Total Users" 
                  value="10,873" 
                  change={12} 
                  icon={<Users size={20} />} 
                />
                <StatsCard 
                  title="Followers Gained" 
                  value="247,892" 
                  change={18} 
                  icon={<UserPlus size={20} />} 
                />
                <StatsCard 
                  title="Average Growth" 
                  value="32%" 
                  change={7} 
                  icon={<TrendingUp size={20} />} 
                />
                <StatsCard 
                  title="Active Profiles" 
                  value="5,392" 
                  change={-3} 
                  icon={<Activity size={20} />} 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Get Started Section */}
        <section className="py-16 bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to grow your <span className="instagram-gradient-text">Instagram following?</span>
                </h2>
                <p className="mt-4 text-lg text-gray-700">
                  Join thousands of content creators who are growing their Instagram presence through 
                  our authentic follow exchange system. Start for free today and see results within days.
                </p>
                <div className="mt-8 space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                  <Button size="lg" className="bg-instagram-purple hover:bg-opacity-90">
                    Create Free Account
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <AuthForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Authentication Modal would go here in a real app */}
    </div>
  );
};

export default Index;
