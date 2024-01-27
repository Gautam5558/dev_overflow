import { getTopQuestions } from "@/lib/actions/question.action";
import { getPopularTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RightSidebar = async () => {
  const { questions }: any = await getTopQuestions({});
  const { tags }: any = await getPopularTags({});
  return (
    <div className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen max-w-[330px] flex-col gap-6 overflow-y-auto p-6 pt-36 shadow-light-300 max-xl:hidden dark:shadow-none">
      <div className="">
        <span className="text-dark200_light900 h3-bold">Top Questions</span>
        <div className="mt-6 flex flex-col gap-7">
          {questions.map((question: any) => {
            return (
              <Link
                href={"/questions/" + question._id}
                key={question._id}
                className="text-dark500_light700 body-medium flex items-center justify-between"
              >
                <span className=" max-w-[248px]">{question.title}</span>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  width={20}
                  height={20}
                  alt="right-icon"
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-6">
        <span className="text-dark200_light900 h3-bold">Popular Tags</span>
        <div className="mt-8 flex flex-col gap-3">
          {tags.map((tag: any) => {
            return (
              <Link
                href={"/tags/" + tag._id}
                key={tag.name}
                className=" flex items-center justify-between "
              >
                <span className="background-light800_dark300 text-light400_light500 subtle-medium rounded-[6px] px-4 py-2 ">
                  {tag.name}
                </span>
                <span className="small-medium text-dark500_light700">
                  {tag.numberOfQuestions}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
