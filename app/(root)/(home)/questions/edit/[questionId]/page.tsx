import Question from "@/components/forms/Question";
import { getQuestion } from "@/lib/actions/question.action";
import { getUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const EditQuestion = async ({ params }: { params: { questionId: string } }) => {
  const { questionId } = params;
  const { userId } = auth();
  const user = await getUser({ userId });
  const { questionData }: any = await getQuestion({ questionId });
  return (
    <div>
      <h2 className="text-dark100_light900 h1-bold mb-9">Edit Question</h2>
      <Question
        userId={user._id.toString()}
        questionData={JSON.parse(JSON.stringify(questionData))}
      />
    </div>
  );
};

export default EditQuestion;
