import Link from "next/link";
import React from "react";

const TagCard = ({ tag }: any) => {
  return (
    <Link
      href={"/tags/" + tag._id}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <div className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center gap-4  border p-8">
        <span className="text-dark300_light900 background-light800_dark400 paragraph-semibold rounded-[4px]  px-5 py-2">
          {tag.name}
        </span>
        <div className="flex justify-between gap-3">
          <span className="primary-text-gradient body-semibold ">
            {tag.questions.length}+{" "}
          </span>
          <span className="text-dark400_light500 small-medium">Questions</span>
        </div>
      </div>
    </Link>
  );
};

export default TagCard;
