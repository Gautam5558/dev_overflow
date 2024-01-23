import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import NoResult from "@/components/shared/NoResult";
import { userFilters } from "@/constants";
import { getUsers } from "@/lib/actions/user.action";
import React from "react";

const Community = async () => {
  const users = await getUsers({});

  return (
    <section>
      <div className="">
        <div className="flex items-center justify-between">
          <h2 className="text-dark100_light900 h1-bold">All Users</h2>
        </div>
        <div className=" mt-[30px] flex  justify-between gap-[30px] max-md:flex-row max-md:items-center max-md:justify-between">
          <LocalSearchBar placeholder={"Search by username..."} />
          <Filter options={userFilters} display="fullscreen" />
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          {users?.length === 0 ? (
            <NoResult
              text="users"
              paragraph="Be the first to signup! 🚀 Signup and kickstart the
          ask a question 💡"
              buttonLink="/signup"
              buttonText="Signup"
            />
          ) : (
            users?.map((user) => {
              return <UserCard key={user._id} user={user} />;
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Community;