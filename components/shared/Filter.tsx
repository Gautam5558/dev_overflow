import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import React from "react";

const Filter = ({
  options,
  display,
}: {
  options: { id: number; tagName: string; count: number }[];
  display: string;
}) => {
  return (
    <div
      className={
        display === "fullscreen"
          ? "no-focus min-h-[68px]"
          : "no-focus min-h-[68px] md:hidden"
      }
    >
      <Select>
        <SelectTrigger className="background-light800_dark300  light-border body-regular no-focus text-dark500_light700 min-h-[68px] w-[180px] border-slate-200 p-5 focus:outline-none dark:border-slate-800">
          <SelectValue placeholder="Select a Filter" />
        </SelectTrigger>
        <SelectContent className=" background-light900_dark200  text-dark500_light700 border-slate-200  dark:border-slate-800 ">
          {options.map((item) => {
            return (
              <SelectItem
                value={item.tagName}
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
