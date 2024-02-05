import Question from "@/components/forms/Question";
import { getUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Ask Question | dev_overflow",
  description:
    "Welcome to our Ask a Question Page – the heart of our vibrant community where curiosity meets collaboration! Whether you're facing a coding conundrum, seeking expert advice, or simply looking to expand your knowledge, our platform empowers you to pose questions, spark discussions, and tap into the collective wisdom of our diverse community of developers, technologists, and enthusiasts.",
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
