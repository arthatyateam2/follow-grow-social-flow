
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative pt-24 pb-16 overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 opacity-50"
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-purple-50 to-transparent" aria-hidden="true" />
      
      <div className="relative container mx-auto px-4 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-8 animate-fade-in">
            <div>
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                <Instagram size={14} className="mr-1" />
                Instagram Growth Made Simple
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="block">Get Real Instagram</span>
                <span className="block instagram-gradient-text">Followers Fast</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-3xl">
                Grow your Instagram following organically by connecting with others.
                For every 2-3 accounts you follow, gain a new follower for your profile.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-instagram-purple hover:bg-opacity-90 transition-all">
                Start Growing Now
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                See How It Works
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"
                    style={{
                      backgroundImage: `url(https://i.pravatar.cc/100?img=${i+10})`,
                      backgroundSize: 'cover'
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">1,000+</span> users growing their following
              </p>
            </div>
          </div>

          <div className="animate-slide-up">
            <div className="relative h-full flex items-center justify-center">
              <div className="relative mx-auto rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200 max-w-sm">
                <div className="p-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Your Growth</span>
                      <span className="text-green-600 text-sm font-medium">+27% this week</span>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <span className="text-4xl font-bold text-gray-900">846</span>
                      <p className="text-gray-600 text-sm mt-1">New followers this month</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <span className="text-xl font-semibold text-purple-900">36</span>
                        <p className="text-purple-700 text-xs">Followed today</p>
                      </div>
                      <div className="bg-pink-50 rounded-lg p-3">
                        <span className="text-xl font-semibold text-pink-900">12</span>
                        <p className="text-pink-700 text-xs">New followers</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button className="w-full bg-instagram-gradient hover:opacity-90">
                        <Instagram size={16} className="mr-2" />
                        Connect Instagram
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
