import { Button } from "@/components/ui/button";
import { filters } from "@/constants";
import Link from "next/link";
import React from "react";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { getQuestions } from "@/lib/actions/question.action";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import Filter from "@/components/shared/Filter";
import HomeFilter from "@/components/shared/HomeFilter";
import Pagination from "@/components/shared/Pagination";

// import { questionSchemaType } from "@/lib/models/question.model";

const Home = async ({
  searchParams,
}: {
  searchParams: { q: string; filter: string; page: string };
}) => {
  const result: any = await getQuestions({
    search: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

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
          <LocalSearchBar placeholder={"Search questions..."} route="/" />
          <HomeFilter />
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
          result.questions.map((question: any) => {
            return <QuestionCard key={question._id} question={question} />;
          })
        ) : (
          <NoResult
            text="questions"
            paragraph="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            buttonLink="/ask-question"
            buttonText="Ask a Question"
          />
        )}
      </div>
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
};

export default Home;
