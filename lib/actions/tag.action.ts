"use server";

import { FilterQuery } from "mongoose";
import { connectDb } from "../connectdb";
import Question from "../models/question.model";
import Tag from "../models/tag.model";
import User from "../models/user.model";
import Answer from "../models/answer.model";
import { getMostFrequentIds } from "../utils";

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
    const { userId } = params;

    const tags = [];
    // TODO is get questions which this user has interacted with either created or answersed
    // then after getting these questions, we can access their tags (Limit of tags to get shoud be 3 atmost)
    const userQuestions = await Question.find({ author: [userId] });
    for (let i = 0; i < userQuestions.length; i++) {
      for (let j = 0; j < userQuestions[i].tags.length; j++) {
        tags.push(userQuestions[i].tags[j]);
      }
    }
    const userAnswers = await Answer.find({ author: userId });
    const questionIds = [];
    for (let i = 0; i < userAnswers.length; i++) {
      questionIds.push(userAnswers[i].questionId);
    }
    const questionsArray = [];
    for (let i = 0; i < questionIds.length; i++) {
      const question = await Question.findById(questionIds[i]);
      questionsArray.push(question);
    }

    for (let i = 0; i < questionsArray.length; i++) {
      for (let j = 0; j < questionsArray[i].tags.length; j++) {
        tags.push(questionsArray[i].tags[j]);
      }
    }

    const mostFrequentTagIds = getMostFrequentIds(tags);

    const populatedTags = [];

    for (let i = 0; i < mostFrequentTagIds.length; i++) {
      const tag = await Tag.findById(mostFrequentTagIds[i]);
      populatedTags.push(tag);
    }

    return { tagsRelatedToUser: populatedTags.slice(0, 3) };
  } catch (err) {
    console.log(err);
  }
};

export const getAllTags = async (params: any) => {
  try {
    connectDb();

    const { search, filter, page = 1, pageSize = 6 } = params;

    const numberTagsToSkip = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};
    if (search) {
      query.$or = [{ name: { $regex: new RegExp(search, "i") } }];
    }

    let sortOptions = {};
    switch (filter) {
      case "oldest tags":
        sortOptions = { createdOn: 1 };
        break;
      case "newest tags":
        sortOptions = { createdOn: -1 };
        break;
      default:
        break;
    }

    let tags;
    if (filter === "top tags") {
      tags = await Tag.aggregate([
        { $match: query },
        { $project: { name: 1, count: { $size: "$questions" }, questions: 1 } },
        { $skip: numberTagsToSkip },
        { $limit: pageSize },
        { $sort: { count: -1 } },
      ]);
    } else {
      tags = await Tag.find(query)
        .skip(numberTagsToSkip)
        .limit(pageSize)
        .sort(sortOptions);
    }

    const totalTags = await Tag.countDocuments();
    const isNext = totalTags > numberTagsToSkip + tags.length;

    return { tags, isNext };
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
