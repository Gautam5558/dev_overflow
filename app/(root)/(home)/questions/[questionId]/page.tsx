import { getQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";
import HtmlParser from "@/components/shared/HtmlParser";
import Answer from "@/components/forms/Answer";
import { getAnswers } from "@/lib/actions/answer.action";
import Filter from "@/components/shared/Filter";
import { answerFilters } from "@/constants";
import { auth } from "@clerk/nextjs";
import AnswerCard from "@/components/cards/AnswerCard";
import { getUser } from "@/lib/actions/user.action";
import Voting from "@/components/shared/Voting";
import Pagination from "@/components/shared/Pagination";

TimeAgo.addDefaultLocale(en);

const QuestionDetail = async ({
  params,
  searchParams,
}: {
  params: { questionId: string };
  searchParams: { filter: string; page: string };
}) => {
  const { questionId } = params;
  const { userId } = auth();
  const { questionData }: any = await getQuestion({ questionId });

  const { answers, isNext, totalAnswers }: any = await getAnswers({
    questionId,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  const user = await getUser({ userId });

  const timeAgo = new TimeAgo("en-US");
  questionData._id = questionData._id.toString();

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={"/profile/" + questionData.author[0].clerkId}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={questionData.author[0].picture}
              alt="userImage"
              width={22}
              height={22}
              className="rounded-[50%]"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {questionData.author[0].name}
            </p>
          </Link>
          <Voting
            questionId={questionId}
            userId={user._id.toString()}
            data={JSON.parse(JSON.stringify(questionData))}
            whichVoting="question"
            user={JSON.parse(JSON.stringify(user))}
          />
        </div>
        <h2 className="h2-semibold text-dark200_light900  mt-3.5 w-full text-left">
          {questionData.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <div className="flex items-center gap-1 ">
          <Image
            src="/assets/icons/clock.svg"
            alt="likes"
            width={16}
            height={16}
          />
          <span className="text-dark400_light800 small-regular">
            asked {timeAgo.format(questionData.createdAt)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Image
            src="/assets/icons/message.svg"
            alt="answers"
            width={16}
            height={16}
          />
          <span className="text-dark400_light800 small-regular">
            {answers?.length} answers
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
            {questionData.views} views
          </span>
        </div>
      </div>
      <HtmlParser content={questionData.content} />
      <div className="flex gap-2">
        {questionData.tags.map((tag: any) => {
          return (
            <Link
              href={"/tags/" + tag._id}
              key={tag._id}
              className="text-dark300_light900 background-light800_dark400 subtle-medium rounded-[4px]  px-5 py-2"
            >
              {tag.name}
            </Link>
          );
        })}
      </div>
      <div className="mb-5 mt-6 flex items-center justify-between">
        <h5 className="paragraph-medium primary-text-gradient ">
          {totalAnswers} Answers
        </h5>
        <Filter options={answerFilters} display="fullscreen" />
      </div>
      <div className="flex flex-col gap-6">
        {answers?.map((answer: any) => {
          return (
            <AnswerCard
              key={answer._id}
              answer={answer}
              userId={user._id}
              user={JSON.parse(JSON.stringify(user))}
            />
          );
        })}
      </div>
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={isNext}
      />
      <Answer questionId={questionId} clerkId={userId} />
    </>
  );
};

export default QuestionDetail;
