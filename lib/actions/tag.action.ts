"use server";

import { connectDb } from "../connectdb";
import Tag from "../models/tag.model";

export const getTag = async (params: any) => {
  try {
    connectDb();
    const { tagId } = params;
    const tag = await Tag.findById(tagId);
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
    const tags = await Tag.find();
    return tags;
  } catch (err) {
    console.log(err);
  }
};
