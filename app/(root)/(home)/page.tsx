import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { filters } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QuestionCard, { Props } from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { getQuestions } from "@/lib/actions/question.action";
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
          <div className="dark:dark-gradient flex min-h-[56px] gap-4 rounded-[10px]  bg-light-800 p-4">
            <Image
              src="assets/icons/search.svg"
              width={24}
              height={24}
              alt="search"
            />{" "}
            <Input
              type="text"
              placeholder="search questions..."
              className="dark:dark-gradient no-focus placeholder  paragraph-regular text-dark400_light700 border-0 border-none bg-light-800 shadow-none outline-none"
            />
          </div>
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
          <div className="no-focus md:hidden">
            <Select>
              <SelectTrigger className="background-light800_dark300  light-border body-regular no-focus text-dark500_light700 min-h-[56px] w-[180px] border-slate-200 p-5 focus:outline-none dark:border-slate-800">
                <SelectValue placeholder="Select a Filter" />
              </SelectTrigger>
              <SelectContent className=" background-light900_dark200  text-dark500_light700 border-slate-200  dark:border-slate-800 ">
                {filters.map((item) => {
                  return (
                    <SelectItem
                      value={item.tagName}
                      key={item.id}
                      className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      {item.tagName}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
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
