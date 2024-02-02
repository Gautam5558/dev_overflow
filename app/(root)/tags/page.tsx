import TagCard from "@/components/cards/TagCard";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import { tagFilters } from "@/constants";
import { getAllTags } from "@/lib/actions/tag.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tags | dev_overflow",
};

const Tags = async ({
  searchParams,
}: {
  searchParams: { q: string; filter: string; page: string };
}) => {
  const { tags, isNext }: any = await getAllTags({
    search: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <section>
      <div className="">
        <div className="flex items-center justify-between">
          <h2 className="text-dark100_light900 h1-bold">All Tags</h2>
        </div>
        <div className=" mt-[30px] flex  justify-between gap-[30px] max-md:flex-row max-md:items-center max-md:justify-between">
          <LocalSearchBar placeholder={"Search by tags..."} route="/tags" />
          <Filter options={tagFilters} display="fullscreen" />
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          {tags?.length === 0 ? (
            <NoResult
              text="tags"
              paragraph="Since there are no questions hence there isnt't a tag present. 🚀 Create a question and hence create tags 💡"
              buttonLink="/ask-question"
              buttonText="Ask a Question"
            />
          ) : (
            tags?.map((tag: any) => {
              return <TagCard key={tag._id} tag={tag} />;
            })
          )}
        </div>
      </div>
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={isNext}
      />
    </section>
  );
};

export default Tags;
