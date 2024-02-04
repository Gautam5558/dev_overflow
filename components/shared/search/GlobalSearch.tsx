"use client";
import { Input } from "@/components/ui/input";
import { getUrlFromQuery, removeQueryFromUrl } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("global");
  const [search, setSearch] = useState(q || "");
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const searchBoxRef = useRef(null);

  const navigate = useRouter();

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (
        searchBoxRef.current &&
        // @ts-ignore
        !searchBoxRef.current.contains(e.target)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    setOpen(false);
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [path]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        const url = getUrlFromQuery({
          existingSearchParams: searchParams.toString(),
          key: "global",
          value: search,
        });
        navigate.push(url);
      } else {
        const url = removeQueryFromUrl({
          existingSearchParams: searchParams.toString(),
          key: "global",
        });
        navigate.push(url);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [search, searchParams, navigate, path]);

  return (
    <div
      className="relative flex w-full max-w-[600px] flex-col gap-2"
      ref={searchBoxRef}
    >
      <div
        className="relative w-full max-w-[600px]
  max-lg:hidden"
      >
        <div
          className="background-light800_darkgradient relative
    flex min-h-[56px] grow items-center gap-1 rounded-xl px-4"
        >
          <Image
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
            className="cursor-pointer"
          />
          <Input
            value={search}
            onChange={(e) => {
              if (!open) {
                setOpen(true);
              }
              if (e.target.value === "") {
                setOpen(false);
              }
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Search globally"
            className="paragraph-regular no-focus placeholder text-dark400_light700 border-none
           bg-transparent shadow-none outline-none"
          />
        </div>
      </div>
      {open && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
