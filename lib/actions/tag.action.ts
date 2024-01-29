"use server";

import { FilterQuery } from "mongoose";
import { connectDb } from "../connectdb";
import Question from "../models/question.model";
import Tag from "../models/tag.model";
import User from "../models/user.model";

export const getTag = async (params: any) => {
  try {
    connectDb();
    const { tagId } = params;
    const tag = await Tag.findById(tagId).populate({
      path: "questions",
      model: Question,
    });
    return tag;
  } catch (err) {
    console.log(err);
  }
};

export const getUserTags = async (params: any) => {
  try {
    connectDb();
    // TODO is get questions which this user has interacted with either created or answersed
    // then after getting these questions, we can access their tags (Limit of tags to get shoud be 3 atmost)
    return ["tag1", "tag2", "tag3"];
  } catch (err) {
    console.log(err);
  }
};

export const getAllTags = async (params: any) => {
  try {
    connectDb();

    const { search, filter } = params;
    const query: FilterQuery<typeof Tag> = {};
    if (search) {
      query.$or = [{ name: { $regex: new RegExp(search, "i") } }];
    }

    let sortOptions = {};
    switch (filter) {
      case "top tags":
        sortOptions = { questions: -1 };
        break;
      case "oldest tags":
        sortOptions = { createdOn: 1 };
        break;
      case "newest tags":
        sortOptions = { createdOn: -1 };
        break;
      default:
        break;
    }

    const tags = await Tag.find(query).sort(sortOptions);
    return tags;
  } catch (err) {
    console.log(err);
  }
};

export const getTagDetailAndQuestionDocumentsPopulated = async (
  params: any
) => {
  try {
    connectDb();
    const { tagId } = params;
    const tag = await Tag.findById(tagId);
    const questions = [];
    for (let i = 0; i < tag.questions.length; i++) {
      const question = await Question.findById(tag.questions[i])
        .populate({ path: "tags", model: Tag })
        .populate({ path: "author", model: User });
      questions.push(question);
    }
    return { tag, questions };
  } catch (err) {
    console.log(err);
  }
};

export const getPopularTags = async (params: any) => {
  try {
    connectDb();
    const tags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return { tags };
  } catch (err) {
    console.log(err);
  }
};
