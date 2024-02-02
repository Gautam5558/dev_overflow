"use client";
import {
  handleAnswerDownvote,
  handleAnswerUpvote,
} from "@/lib/actions/answer.action";
import { questionView } from "@/lib/actions/interaction.action";
import { handleDownvote, handleUpvote } from "@/lib/actions/question.action";
import { savingQuestionHandle } from "@/lib/actions/user.action";
import { getToast } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  questionId: string;
  userId: string;
  data: { upvotes: string[]; downvotes: string[] };
  whichVoting: string;
  user: { saved: string[] };
}

const Voting = ({ questionId, userId, data, whichVoting, user }: Props) => {
  const path = usePathname();
  const navigate = useRouter;

  useEffect(() => {
    async function questionViewedInteraction() {
      await questionView({ userId: userId || undefined, questionId });
    }
    if (whichVoting === "question") {
      console.log("1");
      questionViewedInteraction();
    }
  }, [userId, questionId, path, navigate]);

  const handleClick = async (vote: string) => {
    if (vote === "u") {
      if (whichVoting === "question") {
        const { user, hasUpvoted }: any = await handleUpvote({
          userId,
          questionId,
          path,
        });
        console.log(user);
        if (hasUpvoted) {
          getToast("Question upvoted", "success");
        } else {
          getToast("Question upvote removed", "error");
        }
      } else {
        // Here questionId is actually answerId in this case
        const { user, hasUpvoted }: any = await handleAnswerUpvote({
          userId,
          questionId,
          path,
        });
        console.log(user);
        if (hasUpvoted) {
          getToast("Answer upvoted", "success");
        } else {
          getToast("Answer upvote removed", "error");
        }
      }
    } else {
      if (whichVoting === "question") {
        const { user, hasDownvoted }: any = await handleDownvote({
          userId,
          questionId,
          path,
        });
        console.log(user);
        if (hasDownvoted) {
          getToast("Question downvoted", "success");
        } else {
          getToast("Question downvote removed", "error");
        }
      } else {
        const { user, hasDownvoted }: any = await handleAnswerDownvote({
          userId,
          questionId,
          path,
        });
        console.log(user);
        if (hasDownvoted) {
          getToast("Answer downvoted", "success");
        } else {
          getToast("Answer downvote removed", "error");
        }
      }
    }
  };

  const handleSave = async () => {
    const { hasSaved }: any = await savingQuestionHandle({
      userId,
      questionId,
      path,
    });
    if (hasSaved) {
      getToast("Question added to collections", "success");
    } else {
      getToast("Question removed from collections", "error");
    }
  };

  return (
    <div className="flex justify-end gap-2.5">
      <Image
        src={
          data.upvotes.includes(userId)
            ? "/assets/icons/upvoted.svg"
            : "/assets/icons/upvote.svg"
        }
        className="cursor-pointer"
        width={18}
        height={18}
        alt="upvotes"
        onClick={() => {
          handleClick("u");
        }}
      />
      <span className="subtle-medium text-dark400_light900 background-light700_dark400 items-center justify-center rounded-[2px] p-1">
        {data.upvotes.length}
      </span>
      <Image
        src={
          data.downvotes.includes(userId)
            ? "/assets/icons/downvoted.svg"
            : "/assets/icons/downvote.svg"
        }
        className="cursor-pointer"
        width={18}
        height={18}
        alt="downvotes"
        onClick={() => {
          handleClick("d");
        }}
      />
      <span className="subtle-medium text-dark400_light900 background-light700_dark400 items-center justify-center rounded-[2px] p-1">
        {data.downvotes.length}
      </span>
      {whichVoting === "question" && (
        <Image
          src={
            user.saved.includes(questionId)
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          alt="saveImg"
          className="ml-1.5 cursor-pointer"
          onClick={() => {
            handleSave();
          }}
        />
      )}
    </div>
  );
};

export default Voting;
