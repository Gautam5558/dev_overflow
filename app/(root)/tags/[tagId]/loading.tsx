import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <Skeleton className="skeleton-color h-11 w-[200px]" />
      <div className="mb-12 mt-11 flex flex-wrap gap-5 ">
        <Skeleton className="skeleton-color h-14 flex-1 " />
      </div>
      <div className="flex flex-col gap-6">
        {new Array(10).fill(1, 0, 9).map((item, index) => {
          return (
            <Skeleton
              key={index}
              className="skeleton-color h-44 rounded-[10px]"
            />
          );
        })}
      </div>
    </section>
  );
};

export default Loading;
