
import { Button } from "@/components/ui/button";
import { ExternalLink, UserCheck, UserPlus, Instagram } from "lucide-react";

interface ProfileCardProps {
  username: string;
  followers: number;
  following: number;
  avatar: string;
  category?: string;
  isFollowing?: boolean;
}

const ProfileCard = ({ 
  username, 
  followers, 
  following, 
  avatar, 
  category = "Personal", 
  isFollowing = false 
}: ProfileCardProps) => {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all bg-white">
      <div className="h-24 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400"></div>
      <div className="px-5 pt-0 pb-5">
        <div className="flex justify-center">
          <div 
            className="w-20 h-20 rounded-full border-4 border-white bg-gray-200 -mt-10"
            style={{ backgroundImage: `url(${avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></div>
        </div>
        
        <div className="text-center mt-3">
          <h3 className="font-semibold text-lg">{username}</h3>
          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full mt-1">
            {category}
          </span>
        </div>
        
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <span className="block font-semibold">{followers.toLocaleString()}</span>
            <span className="text-xs text-gray-500">Followers</span>
          </div>
          <div className="text-center">
            <span className="block font-semibold">{following.toLocaleString()}</span>
            <span className="text-xs text-gray-500">Following</span>
          </div>
        </div>
        
        <div className="mt-5 space-y-2">
          {isFollowing ? (
            <Button variant="secondary" className="w-full">
              <UserCheck size={16} className="mr-2" />
              Following
            </Button>
          ) : (
            <Button className="w-full bg-instagram-purple hover:bg-opacity-90">
              <UserPlus size={16} className="mr-2" />
              Follow
            </Button>
          )}
          <Button variant="outline" className="w-full">
            <Instagram size={16} className="mr-2" />
            View Profile
            <ExternalLink size={14} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
