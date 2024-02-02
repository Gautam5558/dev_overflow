import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <Skeleton className="skeleton-color h-[140px] w-[140px] rounded-full" />
        <Skeleton className="skeleton-color h-[140px] w-[250px]" />
      </div>
      <div className="flex gap-4">
        {new Array(4).fill(1, 0, 9).map((item, index) => {
          return (
            <Skeleton
              key={index}
              className="skeleton-color h-[140px] w-[200px] rounded-md"
            />
          );
        })}
      </div>
      <div className="mt-12 flex flex-col gap-6">
        {new Array(3).fill(1, 0, 9).map((item, index) => {
          return (
            <Skeleton
              key={index}
              className="skeleton-color h-44 rounded-[10px]"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Loading;
