import { tags, topQuestions } from "@/constants";
import Image from "next/image";
import React from "react";

const RightSidebar = () => {
  return (
    <div className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen max-w-[330px] flex-col gap-6 overflow-y-auto p-6 pt-36 shadow-light-300 max-xl:hidden dark:shadow-none">
      <div className="top">
        <span className="background-light900_dark200 h3-bold">
          Top Questions
        </span>
        <div className="mt-6 flex flex-col gap-7">
          {topQuestions.map((question) => {
            return (
              <div
                key={question.id}
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
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-6">
        <span className="background-light900_dark200 h3-bold">
          Popular Tags
        </span>
        <div className="mt-8 flex flex-col gap-3">
          {tags.map((tag) => {
            return (
              <div key={tag.id} className=" flex items-center justify-between ">
                <span className="background-light800_dark300 text-light400_light500 subtle-medium rounded-[6px] px-4 py-2 ">
                  {tag.tagName}
                </span>
                <span className="small-medium text-dark500_light700">
                  {tag.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
