import { useState, useEffect } from "react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { StatsCards } from "@/components/profile/StatsCards";
import { PaymentManagement } from "@/components/profile/PaymentManagement";
import { ContestStatistics } from "@/components/profile/ContestStatistics";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import { Toaster } from "@/components/ui/toaster";
import { mockUser } from "@/data/mockData";
import { User } from "@/types/user";
import { getUserProfile } from "@/services/studentServices";
import { useParams } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(mockUser);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams() as { id: string }; // Assuming the user ID is passed as a URL parameter

  // Simulate loading user data
  useEffect(() => {
    const loadUserData = async () => {
      // Simulate API call delay
      const res: User = await getUserProfile(id);
      setUser(res);
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  const handleDeleteUser = () => {
    console.log("Deleting user:", user.id);
    // In a real app, you would make an API call here
  };

  const handleNotifyUser = () => {
    console.log("Notifying user:", user.id);
    // In a real app, you would make an API call here
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-7xl">
        <ProfileHeader user={user} />

        <div className="px-8 pb-8">
          <StatsCards user={user} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <PaymentManagement
                user={user}
                onDeleteUser={handleDeleteUser}
                onNotifyUser={handleNotifyUser}
              />
            </div>
            <div className="lg:col-span-2">
              <ContestStatistics user={user} />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Profile;
