import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";

const LocalSearchBar = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="dark:dark-gradient flex min-h-[56px] gap-4 rounded-[10px]  bg-light-800 p-4">
      <Image
        src="/assets/icons/search.svg"
        width={24}
        height={24}
        alt="search"
      />{" "}
      <Input
        type="text"
        placeholder={placeholder}
        className="dark:dark-gradient no-focus placeholder  paragraph-regular text-dark400_light700 border-0 border-none bg-light-800 shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearchBar;
