"use client";
import { globalFilters } from "@/constants";
import { getUrlFromQuery, removeQueryFromUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const GlobalSearchFilters = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("type");
  const navigate = useRouter();

  const [active, setActive] = useState(q || "");

  const handleClick = (type: string) => {
    if (type === active) {
      setActive("");
      const url = removeQueryFromUrl({
        existingSearchParams: searchParams.toString(),
        key: "type",
      });
      navigate.push(url);
    } else {
      setActive(type);
      const url = getUrlFromQuery({
        existingSearchParams: searchParams.toString(),
        key: "type",
        value: type,
      });
      navigate.push(url);
    }
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type: </p>
      <div className="flex gap-3">
        {globalFilters.map((filter, index) => {
          return (
            <button
              onClick={() => handleClick(filter.value)}
              type="button"
              key={index}
              className={`light-border-2
               ${
                 active === filter.value
                   ? "bg-primary-500 text-light-900"
                   : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500"
               }
                small-medium rounded-2xl px-5 py-2 capitalize
                dark:text-light-800 dark:hover:text-primary-500`}
            >
              {filter.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GlobalSearchFilters;
