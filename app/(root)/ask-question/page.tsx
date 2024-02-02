import Question from "@/components/forms/Question";
import { getUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Ask Question | dev_overflow",
};

const AskQuestion = async () => {
  const { userId } = auth();

  const user = await getUser({ userId });

  return (
    <div>
      <h2 className="text-dark100_light900 h1-bold mb-9">
        Ask a public question
      </h2>
      <Question userId={user?._id.toString()} />
    </div>
  );
};

export default AskQuestion;
