import Image from "next/image";
import React from "react";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";
import Link from "next/link";
import { getAnswers } from "@/lib/actions/answer.action";
import { SignedIn, auth } from "@clerk/nextjs";
import EditDeleteButtons from "../shared/EditDeleteButtons";

TimeAgo.addDefaultLocale(en);

export interface Props {
  question: {
    _id: string;
    title: string;
    content: string;
    tags: object[];
    author: { _id: string; clerkId: string; picture: string; name: string }[];
    upvotes: string[];
    downvotes: string[];
    views: number;
    createdAt: Date;
  };
  type?: string;
}

const QuestionCard = async (props: Props) => {
  const timeAgo = new TimeAgo("en-US");

  const { totalAnswers }: any = await getAnswers({
    questionId: props.question._id,
  });
  const { userId } = auth();
  const buttonsRenderOrNot =
    userId === props.question.author[0].clerkId &&
    props.type === "profileDetailPageCard";

  return (
    <div
      className="dark:dark-gradient shadow-light100_dark100 flex flex-col gap-3.5 rounded-[10px]
    border bg-light-900 px-11 py-9"
    >
      <div>
        <span className="small-regular capitalize sm:hidden">
          . {timeAgo.format(props.question.createdAt)}
        </span>
        <div className="flex items-center justify-between gap-2">
          <Link href={"/questions/" + props.question._id}>
            <h3 className="base-semibold text-dark200_light900">
              {props.question.title}
            </h3>
          </Link>
          <SignedIn>
            {buttonsRenderOrNot && (
              <EditDeleteButtons
                questionId={props.question._id.toString()}
                type="question"
              />
            )}
          </SignedIn>
        </div>
      </div>
      <div className="flex gap-1">
        {props.question.tags.map((tag: any) => {
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
        <Link
          href={"/profile/" + props.question.author[0].clerkId}
          className="flex flex-1 items-center gap-1"
        >
          <Image
            src={props.question.author[0].picture}
            alt="Author Image"
            width={16}
            height={16}
            className="rounded-[50%]"
          />
          <span className="text-dark400_light700 body-medium capitalize">
            {props.question.author[0].name}
            <span className="small-regular max-sm:hidden">
              . {timeAgo.format(props.question.createdAt)}
            </span>
          </span>
        </Link>
        <div className=" flex flex-1 items-center justify-end gap-3">
          <div className="flex items-center gap-1 ">
            <Image
              src="/assets/icons/like.svg"
              alt="likes"
              width={16}
              height={16}
            />
            <span className="text-dark400_light800 small-regular">
              {props.question.upvotes.length} votes
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
              {totalAnswers} comments
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
              {props.question.views} views
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
