"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { getUrlFromQuery } from "@/lib/utils";

interface Props {
  pageNumber: number;
  isNext: boolean;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const searchParams = useSearchParams();
  const navigate = useRouter();

  const handlePagination = (type: string) => {
    if (type === "prev") {
      const url = getUrlFromQuery({
        existingSearchParams: searchParams.toString(),
        key: "page",
        value: pageNumber - 1,
      });
      navigate.push(url);
    } else {
      const url = getUrlFromQuery({
        existingSearchParams: searchParams.toString(),
        key: "page",
        value: pageNumber + 1,
      });
      navigate.push(url);
    }
  };

  if (pageNumber === 1 && isNext === false) {
    return null;
  }

  return (
    <div>
      <div className="mt-5 flex items-center justify-center gap-5">
        <Button
          className="background-light800_dark300 light-border-2 text-dark400_light800 body-medium flex items-center justify-center rounded-[8px] px-4 py-2.5"
          onClick={() => {
            handlePagination("prev");
          }}
          disabled={pageNumber === 1}
        >
          Prev
        </Button>
        <span className="body-semibold primary-gradient text-dark400_light900 flex items-center justify-center rounded-[8px] px-3 py-2 ">
          {pageNumber}
        </span>
        <Button
          className="background-light800_dark300 light-border-2 text-dark400_light800 body-medium flex items-center justify-center rounded-[8px] px-4 py-2.5"
          onClick={() => {
            handlePagination("next");
          }}
          disabled={!isNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
