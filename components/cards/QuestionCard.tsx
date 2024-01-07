import Image from "next/image";
import React from "react";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";
import Link from "next/link";
TimeAgo.addDefaultLocale(en);

interface Props {
  _id: number;
  title: string;
  tags: { _id: number; name: string }[];
  author: { name: string; img: string };
  upvotes: number;
  views: number;
  answers: number;
  createdAt: Date;
}

const QuestionCard = (props: Props) => {
  const timeAgo = new TimeAgo("en-US");

  return (
    <Link href={"/questions/" + props._id}>
      <div
        className="dark:dark-gradient shadow-light100_dark100 flex flex-col gap-3.5 rounded-[10px]
    border bg-light-900 px-11 py-9"
      >
        <div>
          <span className="small-regular capitalize sm:hidden">
            . {timeAgo.format(props.createdAt)}
          </span>
          <h3 className="base-semibold text-dark200_light900">{props.title}</h3>
        </div>
        <div className="flex gap-1">
          {props.tags.map((tag) => {
            return (
              <span
                key={tag._id}
                className="subtle-regular text-light400_light500 background-light800_dark300 rounded-[6px] px-4 py-2 uppercase"
              >
                {tag.name}
              </span>
            );
          })}
        </div>
        <div className="mt-2.5 flex items-center justify-between max-xl:flex-col max-xl:items-start max-xl:gap-3 max-lg:flex-row max-lg:justify-between max-md:flex-col max-md:items-start max-md:gap-3">
          <div className="flex flex-1 items-center gap-1">
            <Image
              src={props.author.img}
              alt="Author Image"
              width={16}
              height={16}
              className="rounded-[50%]"
            />
            <span className="text-dark400_light700 body-medium capitalize">
              {props.author.name}{" "}
              <span className="small-regular max-sm:hidden">
                . {timeAgo.format(props.createdAt)}
              </span>
            </span>
          </div>
          <div className=" flex flex-1 items-center justify-end gap-3">
            <div className="flex items-center gap-1 ">
              <Image
                src="/assets/icons/like.svg"
                alt="likes"
                width={16}
                height={16}
              />
              <span className="text-dark400_light800 small-regular">
                {props.upvotes} votes
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Image
                src="/assets/icons/message.svg"
                alt="comments"
                width={16}
                height={16}
              />
              <span className="text-dark400_light800 small-regular">
                {props.answers} comments
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src="/assets/icons/eye.svg"
                alt="views"
                width={16}
                height={16}
              />
              <span className="text-dark400_light800 small-regular">
                {props.views} views
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
