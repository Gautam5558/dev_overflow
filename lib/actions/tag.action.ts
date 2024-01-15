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
