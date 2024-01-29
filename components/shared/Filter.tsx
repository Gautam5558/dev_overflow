"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import React from "react";
import { getUrlFromQuery } from "@/lib/utils";

const Filter = ({
  options,
  display,
}: {
  options: { id: number; tagName: string; count: number }[];
  display: string;
}) => {
  const searchParams = useSearchParams();
  const q = searchParams.get("filter");
  const navigate = useRouter();
  const handleFiltering = (value: string) => {
    const url = getUrlFromQuery({
      existingSearchParams: searchParams.toString(),
      key: "filter",
      value,
    });
    navigate.push(url);
  };

  return (
    <div
      className={
        display === "fullscreen"
          ? "no-focus min-h-[68px]"
          : "no-focus min-h-[68px] md:hidden"
      }
    >
      <Select defaultValue={q || ""} onValueChange={handleFiltering}>
        <SelectTrigger className="background-light800_dark300  light-border body-regular no-focus text-dark500_light700 min-h-[68px] w-[180px] border-slate-200 p-5 focus:outline-none dark:border-slate-800">
          <SelectValue placeholder="Select a Filter" />
        </SelectTrigger>
        <SelectContent className=" background-light900_dark200  text-dark500_light700 border-slate-200  dark:border-slate-800 ">
          {options.map((item) => {
            return (
              <SelectItem
                value={item.tagName.toLowerCase()}
                key={item.id}
                className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                {item.tagName}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
