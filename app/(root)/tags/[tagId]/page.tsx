import QuestionCard from "@/components/cards/QuestionCard";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import { getTagDetailAndQuestionDocumentsPopulated } from "@/lib/actions/tag.action";
import React from "react";

const TagDetails = async ({ params }: any) => {
  const { tagId } = params;
  const { tag, questions }: any =
    await getTagDetailAndQuestionDocumentsPopulated({ tagId });

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-dark100_light900 h1-bold">{tag.name}</h2>
      <LocalSearchBar placeholder="search for questions related to this tag" />
      {questions?.map((question: any) => {
        return <QuestionCard question={question} key={question._id} />;
      })}
    </div>
  );
};

export default TagDetails;
