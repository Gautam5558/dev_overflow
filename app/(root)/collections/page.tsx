import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import { filtersForCollections } from "@/constants";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Collections | dev_overflow",
};

const Collections = async ({
  searchParams,
}: {
  searchParams: { q: string; filter: string; page: string };
}) => {
  const { userId } = auth();
  const { user, isNext }: any = await getSavedQuestions({
    clerkId: userId,
    search: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  const questions = user?.saved;

  return (
    <section>
      <div className="">
        <div className="flex items-center justify-between">
          <h2 className="text-dark100_light900 h1-bold">Saved Questions</h2>
        </div>
        <div className=" mt-[30px] flex  items-center justify-between gap-[30px]">
          <LocalSearchBar
            placeholder={"Search saved questions..."}
            route="/collections"
          />
          <Filter options={filtersForCollections} display="fullscreen" />
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
          questions?.map((question: any) => {
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
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={isNext}
      />
    </section>
  );
};

export default Collections;
