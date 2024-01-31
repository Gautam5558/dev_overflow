import { getQuestion } from "@/lib/actions/question.action";
import Link from "next/link";
import React from "react";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";
import Image from "next/image";
import { SignedIn, auth } from "@clerk/nextjs";
import { getUser } from "@/lib/actions/user.action";
import EditDeleteButtons from "../shared/EditDeleteButtons";
TimeAgo.addDefaultLocale(en);

interface Props {
  answer: {
    _id: string;
    author: string;
    questionId: string;
  };
}

const ProfileAnswerCard = async (props: Props) => {
  const timeAgo = new TimeAgo("en-US");
  const { userId } = auth();
  const user: any = await getUser({ userId });
  const { questionData }: any = await getQuestion({
    questionId: props.answer.questionId,
  });

  return (
    <div
      className="dark:dark-gradient shadow-light100_dark100 flex flex-col gap-3.5 rounded-[10px]
border bg-light-900 px-11 py-9"
    >
      <div>
        <span className="small-regular capitalize sm:hidden">
          . {timeAgo.format(questionData.createdAt)}
        </span>
        <div className="flex items-center justify-between gap-2">
          <Link href={"/questions/" + questionData._id}>
            <h3 className="base-semibold text-dark200_light900">
              {questionData.title}
            </h3>
          </Link>
          <SignedIn>
            {props.answer.author.toString() === user._id.toString() && (
              <EditDeleteButtons
                answerId={props.answer._id.toString()}
                type="answer"
              />
            )}
          </SignedIn>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between max-xl:flex-col max-xl:items-start max-xl:gap-3 max-lg:flex-row max-lg:justify-between max-md:flex-col max-md:items-start max-md:gap-3">
        <div className="flex flex-1 items-center gap-1">
          <Image
            src={questionData.author[0].picture}
            alt="Author Image"
            width={16}
            height={16}
            className="rounded-[50%]"
          />
          <span className="text-dark400_light700 body-medium capitalize">
            {questionData.author[0].name}
            <span className="small-regular max-sm:hidden">
              . {timeAgo.format(questionData.createdAt)}
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
              {questionData.upvotes.length} votes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAnswerCard;
