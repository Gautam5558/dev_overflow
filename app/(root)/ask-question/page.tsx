import Question from "@/components/forms/Question";
import { getUser } from "@/lib/actions/user.action";
// import { auth } from "@clerk/nextjs";
import React from "react";

const AskQuestion = async () => {
  const userId = "65a2b2fda5b454888790d448";

  const user = await getUser({ userId });

  return (
    <div>
      <h2 className="text-dark100_light900 h1-bold mb-9">
        Ask a public question
      </h2>
      <Question userId={user?._id} />
    </div>
  );
};

export default AskQuestion;
