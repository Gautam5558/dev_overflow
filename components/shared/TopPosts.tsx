import { getTopQuestionsUser } from "@/lib/actions/question.action";
import React from "react";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";

interface Props {
  userId: string;
  searchParams: {
    page: string;
  };
}

const TopPosts = async ({ userId, searchParams }: Props) => {
  const { questions, isNext }: any = await getTopQuestionsUser({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex flex-col gap-6">
        {questions.map((question: any) => {
          return (
            <QuestionCard
              key={question._id}
              question={question}
              type="profileDetailPageCard"
            />
          );
        })}
      </div>
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={isNext}
      />
    </>
  );
};

export default TopPosts;
