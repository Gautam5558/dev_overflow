import Image from "next/image";
import Link from "next/link";
import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import HtmlParser from "../shared/HtmlParser";
import Voting from "../shared/Voting";
TimeAgo.addDefaultLocale(en);

const AnswerCard = ({ answer, userId, user }: any) => {
  const timeAgo = new TimeAgo("en-US");
  return (
    <main>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link
            href={"profile/" + answer.author.clerkId}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={answer.author.picture}
              width={24}
              height={24}
              alt="profileImg"
              className="rounded-[50%]"
            />
            <span className="text-dark300_light700 body-semibold">
              {answer.author.name}
            </span>
            <span>.</span>
            <span>answered {timeAgo.format(answer.createdAt)}</span>
          </Link>
          <Voting
            data={JSON.parse(JSON.stringify(answer))}
            userId={userId.toString()}
            questionId={answer._id.toString()}
            whichVoting="answer"
            user={user}
          />
        </div>
        <HtmlParser content={answer.content} />
      </div>
    </main>
  );
};

export default AnswerCard;
