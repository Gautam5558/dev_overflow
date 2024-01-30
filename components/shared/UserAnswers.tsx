import { getUserAnswers } from "@/lib/actions/answer.action";
import React from "react";
import ProfileAnswerCard from "../cards/ProfileAnswerCard";
import Pagination from "./Pagination";

interface Props {
  userId: string;
  searchParams: {
    page: string;
  };
}

const UserAnswers = async ({ userId, searchParams }: Props) => {
  const { answers, isNext }: any = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex flex-col gap-6">
        {answers.map((answer: any) => {
          return <ProfileAnswerCard key={answer._id} answer={answer} />;
        })}
      </div>
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={isNext}
      />
    </>
  );
};

export default UserAnswers;
