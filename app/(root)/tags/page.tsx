import TagCard from "@/components/cards/TagCard";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/LocalSearchBar";
import NoResult from "@/components/shared/NoResult";
import { tagFilters } from "@/constants";
import { getAllTags } from "@/lib/actions/tag.action";
import React from "react";

const Tags = async () => {
  const tags = await getAllTags({});

  return (
    <section>
      <div className="">
        <div className="flex items-center justify-between">
          <h2 className="text-dark100_light900 h1-bold">All Tags</h2>
        </div>
        <div className=" mt-[30px] flex  justify-between gap-[30px] max-md:flex-row max-md:items-center max-md:justify-between">
          <LocalSearchBar placeholder={"Search by tags..."} />
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
            tags?.map((tag) => {
              return <TagCard key={tag._id} tag={tag} />;
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Tags;
