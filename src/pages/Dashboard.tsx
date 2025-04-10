
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

interface Profile {
  id: string;
  username: string;
  instagram_handle: string | null;
  followers_count: number;
  following_count: number;
  avatar?: string;
}

const Dashboard = () => {
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [instagramHandle, setInstagramHandle] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (user) {
      fetchProfiles();
      fetchFollowedUsers();
      if (profile?.instagram_handle) {
        setInstagramHandle(profile.instagram_handle);
      }
    }
  }, [user, authLoading, profile]);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user?.id || '')
        .order('followers_count', { ascending: false });
      
      if (error) throw error;
      
      // Add random avatars for demo purposes
      const profilesWithAvatars = data.map((p: any) => ({
        ...p,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
      }));
      
      setProfiles(profilesWithAvatars);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profiles',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowedUsers = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', user.id);
      
      if (error) throw error;
      
      setFollowedUsers(data.map((item: any) => item.following_id));
    } catch (error) {
      console.error('Error fetching followed users:', error);
    }
  };

  const handleFollow = async (profileId: string) => {
    try {
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to follow users',
          variant: 'destructive',
        });
        return;
      }
      
      const isFollowing = followedUsers.includes(profileId);
      
      if (isFollowing) {
        // Unfollow
        const { error } = await supabase
          .from('follows')
          .delete()
          .match({ follower_id: user.id, following_id: profileId });
        
        if (error) throw error;
        
        setFollowedUsers(followedUsers.filter(id => id !== profileId));
        toast({
          title: 'Unfollowed',
          description: 'You have unfollowed this user',
        });
      } else {
        // Follow
        const { error } = await supabase
          .from('follows')
          .insert({ follower_id: user.id, following_id: profileId });
        
        if (error) throw error;
        
        setFollowedUsers([...followedUsers, profileId]);
        toast({
          title: 'Followed',
          description: 'You are now following this user',
        });
      }
      
      // Refresh the profiles to show updated follower counts
      fetchProfiles();
    } catch (error: any) {
      console.error('Error following/unfollowing:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to follow/unfollow user',
        variant: 'destructive',
      });
    }
  };

  const updateInstagramHandle = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ instagram_handle: instagramHandle })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({
        title: 'Profile updated',
        description: 'Your Instagram handle has been updated',
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold instagram-gradient-text">FollowFlow</h1>
            </div>
            <div>
              <Button
                variant="outline"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8 bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium">Your Profile</h2>
            {profile && (
              <div className="mt-4">
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Followers:</strong> {profile.followers_count}</p>
                <p><strong>Following:</strong> {profile.following_count}</p>
                
                <div className="mt-4 flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Instagram Handle
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        @
                      </div>
                      <Input
                        value={instagramHandle || ''}
                        onChange={(e) => setInstagramHandle(e.target.value)}
                        className="pl-8"
                        placeholder="your_instagram_username"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={updateInstagramHandle}
                    className="bg-instagram-purple hover:bg-opacity-90"
                  >
                    Update
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <Tabs defaultValue="discover">
              <TabsList className="mb-6">
                <TabsTrigger value="discover">Discover Users</TabsTrigger>
                <TabsTrigger value="following">People You Follow</TabsTrigger>
                <TabsTrigger value="followers">Your Followers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="discover">
                <h2 className="text-lg font-medium mb-6">Discover Users to Follow</h2>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {profiles.map((profile) => (
                      <ProfileCard 
                        key={profile.id}
                        username={profile.username}
                        followers={profile.followers_count}
                        following={profile.following_count}
                        avatar={profile.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`}
                        category={profile.instagram_handle ? "Instagram" : "User"}
                        instagramHandle={profile.instagram_handle || undefined}
                        isFollowing={followedUsers.includes(profile.id)}
                        onFollow={() => handleFollow(profile.id)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="following">
                <h2 className="text-lg font-medium mb-6">People You Follow</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {profiles
                    .filter(profile => followedUsers.includes(profile.id))
                    .map((profile) => (
                      <ProfileCard 
                        key={profile.id}
                        username={profile.username}
                        followers={profile.followers_count}
                        following={profile.following_count}
                        avatar={profile.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`}
                        category={profile.instagram_handle ? "Instagram" : "User"}
                        instagramHandle={profile.instagram_handle || undefined}
                        isFollowing={true}
                        onFollow={() => handleFollow(profile.id)}
                      />
                    ))}
                  {profiles.filter(profile => followedUsers.includes(profile.id)).length === 0 && (
                    <p className="col-span-full text-center py-8 text-gray-500">
                      You're not following anyone yet. Discover users to follow them!
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="followers">
                <h2 className="text-lg font-medium mb-6">Your Followers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {profiles
                    .filter(profile => {
                      // In a real app, we would have a proper follower query
                      // This is a simplified approach for demo purposes
                      return Math.random() > 0.7;
                    })
                    .map((profile) => (
                      <ProfileCard 
                        key={profile.id}
                        username={profile.username}
                        followers={profile.followers_count}
                        following={profile.following_count}
                        avatar={profile.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`}
                        category={profile.instagram_handle ? "Instagram" : "User"}
                        instagramHandle={profile.instagram_handle || undefined}
                        isFollowing={followedUsers.includes(profile.id)}
                        onFollow={() => handleFollow(profile.id)}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
