import { getUserAnswers } from "@/lib/actions/answer.action";
import React from "react";
import ProfileAnswerCard from "../cards/ProfileAnswerCard";

interface Props {
  userId: string;
}

const UserAnswers = async ({ userId }: Props) => {
  const { answers }: any = await getUserAnswers({ userId });

  return (
    <div className="flex flex-col gap-6">
      {answers.map((answer: any) => {
        return <ProfileAnswerCard key={answer._id} answer={answer} />;
      })}
    </div>
  );
};

export default UserAnswers;
