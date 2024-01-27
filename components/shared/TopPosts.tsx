import { getTopQuestionsUser } from "@/lib/actions/question.action";
import React from "react";
import QuestionCard from "../cards/QuestionCard";

interface Props {
  userId: string;
}

const TopPosts = async ({ userId }: Props) => {
  const { questions }: any = await getTopQuestionsUser({ userId });

  return (
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
  );
};

export default TopPosts;
