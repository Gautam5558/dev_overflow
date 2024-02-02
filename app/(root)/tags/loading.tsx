import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <section>
      <h2 className="text-dark100_light900 h1-bold">All Tags</h2>
      <div className="mb-12 mt-11 flex flex-wrap gap-5 ">
        <Skeleton className="skeleton-color h-14 flex-1 " />
        <Skeleton className="skeleton-color h-14 w-28" />
      </div>
      <div className="flex gap-6">
        {new Array(3).fill(1, 0, 3).map((item, index) => {
          return (
            <Skeleton
              key={index}
              className="skeleton-color h-[134px] w-[260px] rounded-[10px]"
            />
          );
        })}
      </div>
    </section>
  );
};

export default loading;
