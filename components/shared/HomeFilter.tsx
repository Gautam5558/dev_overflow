"use client";
import { filters } from "@/constants";
import { getUrlFromQuery, removeQueryFromUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const HomeFilter = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("filter");
  const [active, setActive] = useState(q || "");

  const navigate = useRouter();

  const handleClick = (tagName: string) => {
    if (active === tagName) {
      setActive("");
      const url = removeQueryFromUrl({
        existingSearchParams: searchParams.toString(),
        key: "filter",
      });
      navigate.push(url);
    } else {
      setActive(tagName);
      const url = getUrlFromQuery({
        existingSearchParams: searchParams.toString(),
        key: "filter",
        value: tagName.toLowerCase(),
      });
      navigate.push(url);
    }
  };

  return (
    <div className="flex items-center gap-3 max-md:hidden">
      {filters.map((tag) => {
        return (
          <div
            onClick={(e) => handleClick(tag.tagName.toLowerCase())}
            key={tag.id}
            className={
              active === tag.tagName.toLowerCase()
                ? " body-medium cursor-pointer rounded-lg bg-primary-100 px-6 py-3 text-primary-500"
                : " background-light800_dark400 body-medium cursor-pointer rounded-lg px-6 py-3 text-light-500 "
            }
          >
            {tag.tagName}
          </div>
        );
      })}
    </div>
  );
};

export default HomeFilter;
