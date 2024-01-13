"use server";

import Question from "../models/question.model";
import { connectDb } from "../connectdb";
import Tag from "../models/tag.model";

export const createQuestion = async (params: any) => {
  try {
    connectDb();
    const { title, content, tags, author } = params;
    // Creating a question document
    const newQuestion = new Question({
      title,
      content,
      author,
    });
    await newQuestion.save();

    // Updatingquestions property of every tag if tag exists
    // If Tag doesn't exist we create a new tag
    const tagDocuments = [];

    for (let i = 0; i < tags.length; i++) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tags[i]}$`, "i") } },
        {
          $setOnInsert: { name: tags[i] },
          $push: { questions: newQuestion._id },
        },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag?._id);
    }
    await Question.findByIdAndUpdate(newQuestion._id, {
      $set: { tags: tagDocuments },
    });

    // Whenever a user creates a question add reputation by +5(ToDo)
  } catch (err) {
    console.log(err);
  }
};
