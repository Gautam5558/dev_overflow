"use server";

import { connectDb } from "../connectdb";
import Answer from "../models/answer.model";
import Question from "../models/question.model";
import Tag from "../models/tag.model";
import User from "../models/user.model";

export const globalSearching = async (params: any) => {
  try {
    connectDb();

    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    const searchableTypes = ["question", "user", "answer", "tag"];
    const modelAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];
    let results: any = [];
    const typeLower = type?.toLowerCase();

    if (!typeLower || !searchableTypes.includes(typeLower)) {
      // search across everything
      for (let i = 0; i < modelAndTypes.length; i++) {
        const queryResults = await modelAndTypes[i].model
          .find({ [modelAndTypes[i].searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => {
            return {
              title:
                modelAndTypes[i].type === "answer"
                  ? `Answers containing ${query}`
                  : item[modelAndTypes[i].searchField],
              type: modelAndTypes[i].type,
              id:
                modelAndTypes[i].type === "user"
                  ? item.clerkId
                  : modelAndTypes[i].type === "answer"
                    ? item.questionId
                    : item._id,
            };
          })
        );
      }
    } else {
      // search in a specific collection corresponding to a model
      const modelInfo = modelAndTypes.find((item) => {
        return item.type === type;
      });

      if (!modelInfo) {
        console.log("something is wrong");
      }

      const queryResults = await modelInfo?.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8);

      const keyValue = modelInfo?.searchField as any;

      results = queryResults?.map((item) => {
        return {
          title:
            type === "answer" ? `Answers containing ${query}` : item[keyValue],
          type,
          id:
            type === "user"
              ? item.clerId
              : type === "answer"
                ? item.questionId
                : item.id,
        };
      });
    }
    return JSON.stringify(results);
  } catch (err) {
    console.log(err);
  }
};
