"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getUrlFromQuery, removeQueryFromUrl } from "@/lib/utils";

const LocalSearchBar = ({
  placeholder,
  route,
}: {
  placeholder: string;
  route?: string;
}) => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [search, setSearch] = useState(q || "");
  const navigate = useRouter();
  const path = usePathname();
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        const url = getUrlFromQuery({
          existingSearchParams: searchParams.toString(),
          key: "q",
          value: search,
        });
        navigate.push(url);
      } else {
        if (path === route) {
          const url = removeQueryFromUrl({
            existingSearchParams: searchParams.toString(),
            key: "q",
          });
          navigate.push(url);
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, path, navigate, searchParams, route, q]);

  return (
    <div className="dark:dark-gradient flex min-h-[56px] gap-4 rounded-[10px]  bg-light-800 p-4">
      <Image
        src="/assets/icons/search.svg"
        width={24}
        height={24}
        alt="search"
      />{" "}
      <Input
        value={search}
        type="text"
        placeholder={placeholder}
        className="dark:dark-gradient no-focus placeholder  paragraph-regular text-dark400_light700 border-0 border-none bg-light-800 shadow-none outline-none"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default LocalSearchBar;
