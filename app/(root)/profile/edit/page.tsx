import Profile from "@/components/forms/Profile";
import { getUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const EditProfile = async () => {
  const { userId } = auth();
  const user: any = await getUser({ userId });
  return (
    <div>
      <h2 className="text-dark100_light900 h1-bold">Edit Profile</h2>
      <Profile user={JSON.parse(JSON.stringify(user))} />
    </div>
  );
};

export default EditProfile;
