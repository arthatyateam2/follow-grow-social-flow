
import { Instagram, UserPlus, Sparkles } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="bg-white py-16 sm:py-24" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="instagram-gradient-text">How It Works</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A simple three-step process to grow your Instagram followers organically.
            No bots, no fake accounts, just real people interested in your content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-6 rounded-2xl transition-all hover:shadow-lg border border-gray-100 hover:border-purple-200"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{
                background: 'linear-gradient(45deg, #8a3ab9, #e95950)',
              }}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">The Follow Exchange Concept</h3>
              <p className="text-gray-700 mb-6">
                For every 2-3 accounts you follow, you gain a new follower. This creates a positive exchange cycle where everyone benefits and grows their Instagram presence.
              </p>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">Your Exchange Rate</span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Great!</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 rounded-md px-3 py-2 flex items-center">
                    <UserPlus size={16} className="text-purple-700 mr-2" />
                    <span>You follow <strong>3</strong></span>
                  </div>
                  <div className="text-gray-500">→</div>
                  <div className="bg-pink-100 rounded-md px-3 py-2 flex items-center">
                    <UserPlus size={16} className="text-pink-700 mr-2" />
                    <span>You gain <strong>1</strong></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <span className="block text-2xl font-bold">2:1</span>
                <span className="text-sm text-gray-600">Average Exchange Ratio</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <span className="block text-2xl font-bold">90%</span>
                <span className="text-sm text-gray-600">Profile Visit Rate</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <span className="block text-2xl font-bold">3.2k</span>
                <span className="text-sm text-gray-600">Active Users</span>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <span className="block text-2xl font-bold">52M+</span>
                <span className="text-sm text-gray-600">Followers Gained</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const steps = [
  {
    title: "Connect Your Instagram",
    description: "Add your Instagram handle to your profile to start the exchange process.",
    icon: <Instagram size={24} className="text-white" />,
  },
  {
    title: "Follow Others",
    description: "Follow 2-3 suggested Instagram profiles from the discover section.",
    icon: <UserPlus size={24} className="text-white" />,
  },
  {
    title: "Gain Followers",
    description: "Others will follow you back, helping your profile grow organically.",
    icon: <Sparkles size={24} className="text-white" />,
  },
];

export default HowItWorks;
