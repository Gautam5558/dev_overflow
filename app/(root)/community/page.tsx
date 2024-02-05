import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import { userFilters } from "@/constants";
import { getUsers } from "@/lib/actions/user.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Community | dev_overflow",
  description:
    "Join a large number of like-minded individuals who share a passion for coding, problem-solving, and pushing the boundaries of technology. Our community page is a bustling hub where you can ask questions, seek advice, and engage in discussions on a wide range of topics,",
};

const Community = async ({
  searchParams,
}: {
  searchParams: { q: string; filter: string; page: string };
}) => {
  const { users, isNext }: any = await getUsers({
    search: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <section>
      <div className="">
        <div className="flex items-center justify-between">
          <h2 className="text-dark100_light900 h1-bold">All Users</h2>
        </div>
        <div className=" mt-[30px] flex  justify-between gap-[30px] max-md:flex-row max-md:items-center max-md:justify-between">
          <LocalSearchBar
            placeholder={"Search by username..."}
            route="/community"
          />
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
            users?.map((user: any) => {
              return <UserCard key={user._id} user={user} />;
            })
          )}
        </div>
      </div>
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={isNext}
      />
    </section>
  );
};

export default Community;
