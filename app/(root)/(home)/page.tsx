import { Button } from "@/components/ui/button";
import { filters } from "@/constants";
import Link from "next/link";
import React from "react";
import QuestionCard, { Props } from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { getQuestions } from "@/lib/actions/question.action";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import Filter from "@/components/shared/Filter";

// import { questionSchemaType } from "@/lib/models/question.model";

const Home = async () => {
  const result: any = await getQuestions({});

  return (
    <section>
      <div className="">
        <div className="flex items-center justify-between">
          <h2 className="text-dark100_light900 h1-bold">All Questions</h2>
          <Link href="/ask-question">
            <Button className="primary-gradient paragraph-medium text-light-900">
              Ask a Question
            </Button>
          </Link>
        </div>
        <div className=" mt-[30px] flex flex-col gap-[30px] max-md:flex-row max-md:items-center max-md:justify-between">
          <LocalSearchBar placeholder={"Search questions..."} />
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
          result.questions.length > 0
            ? "mt-10 flex flex-col gap-6"
            : "flex items-center justify-center"
        }
      >
        {result.questions.length > 0 ? (
          result.questions.map((question: Props) => {
            return <QuestionCard key={question._id} question={question} />;
          })
        ) : (
          <NoResult />
        )}
      </div>
    </section>
  );
};

export default Home;
