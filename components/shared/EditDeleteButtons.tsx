"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import { getToast } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const EditDeleteButtons = ({
  questionId,
  answerId,
  type,
}: {
  questionId?: string;
  answerId?: string;
  type: string;
}) => {
  const path = usePathname();
  const navigate = useRouter();

  const handleDelete = async () => {
    if (type === "question") {
      await deleteQuestion({ questionId, path });
      getToast("Question deleted successfully", "success");
    } else {
      await deleteAnswer({ answerId, path });
      getToast("Answer deleted successfully", "success");
    }
  };

  const handleEdit = () => {
    navigate.push("/questions/edit/" + questionId);
  };

  return (
    <div className="flex items-center gap-3">
      {type === "question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="edit"
          width={14}
          height={14}
          onClick={() => {
            handleEdit();
          }}
          className="cursor-pointer"
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="edit"
        width={14}
        height={14}
        onClick={() => {
          handleDelete();
        }}
        className="cursor-pointer"
      />
    </div>
  );
};

export default EditDeleteButtons;
