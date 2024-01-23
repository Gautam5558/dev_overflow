import QuestionCard, { Props } from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import NoResult from "@/components/shared/NoResult";
import { filters } from "@/constants";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const Collections = async () => {
  const { userId } = auth();
  const result: any = await getSavedQuestions({ clerkId: userId });
  const questions = result?.questions;

  return (
    <section>
      <div className="">
        <div className="flex items-center justify-between">
          <h2 className="text-dark100_light900 h1-bold">Saved Questions</h2>
        </div>
        <div className=" mt-[30px] flex flex-col gap-[30px] max-md:flex-row max-md:items-center max-md:justify-between">
          <LocalSearchBar placeholder={"Search saved questions..."} />
          <div className="flex items-center gap-3 max-md:hidden">
            {filters.map((tag) => {
              return (
                <div
                  key={tag.id}
                  className="background-light800_dark400 body-medium rounded-lg px-6 py-3 text-light-500 "
                >
                  {tag.tagName}
                </div>
              );
            })}
          </div>
          <Filter options={filters} display="mediumscreen" />
        </div>
      </div>
      <div
        className={
          questions?.length > 0
            ? "mt-10 flex flex-col gap-6"
            : "flex items-center justify-center"
        }
      >
        {questions?.length > 0 ? (
          questions?.map((question: Props) => {
            return <QuestionCard key={question._id} question={question} />;
          })
        ) : (
          <NoResult
            text="saved questions"
            paragraph="Save a question by clicking on star at top of question. 🚀 After Saving a question you can see it in your collections! 💡"
            buttonLink="/"
            buttonText="Go to Home Page"
          />
        )}
      </div>
    </section>
  );
};

export default Collections;
