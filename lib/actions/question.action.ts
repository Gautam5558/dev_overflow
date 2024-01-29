"use server";

import Question from "../models/question.model";
import { connectDb } from "../connectdb";
import Tag from "../models/tag.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import Answer from "../models/answer.model";
import Interaction from "../models/interaction.model";
import { FilterQuery } from "mongoose";

export const createQuestion = async (params: any) => {
  try {
    connectDb();
    const { title, content, tags, author, path } = params;
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

    revalidatePath(path);
  } catch (err) {
    console.log(err);
  }
};

export const getQuestions = async (params: any) => {
  try {
    connectDb();
    const { search, filter } = params;

    const query: FilterQuery<typeof Question> = {};
    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { content: { $regex: new RegExp(search, "i") } },
      ];
    }

    let sortOptions = {};
    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      default:
        break;
    }

    // TODO=> Implementation of recommended filter after creating the recommendation system

    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort(sortOptions);
    return { questions };
  } catch (err) {
    console.log(err);
  }
};

export const getQuestion = async (params: { questionId: string }) => {
  try {
    connectDb();
    const questionData = await Question.findById(params.questionId)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User });

    return { questionData };
  } catch (err) {
    console.log(err);
  }
};

export const handleUpvote = async (params: any) => {
  try {
    connectDb();
    const { userId, questionId, path } = params;
    const question = await Question.findById(questionId);
    const isIncludedUpvote = question.upvotes.includes(userId);
    const isIncludedDownvote = question.downvotes.includes(userId);
    if (isIncludedUpvote) {
      await Question.findByIdAndUpdate(questionId, {
        $pull: { upvotes: userId },
      });
    } else if (!isIncludedUpvote && isIncludedDownvote) {
      await Question.findByIdAndUpdate(questionId, {
        $push: { upvotes: userId },
      });
      await Question.findByIdAndUpdate(questionId, {
        $pull: { downvotes: userId },
      });
    } else {
      await Question.findByIdAndUpdate(questionId, {
        $push: { upvotes: userId },
      });
    }
    revalidatePath(path);
    return { userId };
  } catch (err) {
    console.log(err);
  }
};

export const handleDownvote = async (params: any) => {
  try {
    connectDb();
    const { userId, questionId, path } = params;
    const question = await Question.findById(questionId);
    const isIncludedDownvote = question.downvotes.includes(userId);
    const isIncludedUpvote = question.upvotes.includes(userId);
    if (isIncludedDownvote) {
      await Question.findByIdAndUpdate(questionId, {
        $pull: { downvotes: userId },
      });
    } else if (!isIncludedDownvote && isIncludedUpvote) {
      await Question.findByIdAndUpdate(questionId, {
        $push: { downvotes: userId },
      });
      await Question.findByIdAndUpdate(questionId, {
        $pull: { upvotes: userId },
      });
    } else {
      await Question.findByIdAndUpdate(questionId, {
        $push: { downvotes: userId },
      });
    }
    revalidatePath(path);
    // We actually dont need to return anything , we are just returning for the sake of it
    return { userId };
  } catch (err) {
    console.log(err);
  }
};

export const getTopQuestionsUser = async (params: any) => {
  try {
    connectDb();
    const { userId } = params;
    const questions = await Question.find({ author: [userId] })
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ views: -1, createdAt: -1 });
    return { questions };
  } catch (err) {
    console.log(err);
  }
};

export const deleteQuestion = async (params: any) => {
  try {
    connectDb();
    const { questionId, path } = params;
    const question = await Question.findById(questionId);
    await Answer.deleteMany({ questionId });
    for (let i = 0; i < question.tags.length; i++) {
      await Tag.findOneAndUpdate(
        { _id: question.tags[i] },
        { $pull: { questions: questionId } }
      );
    }
    await Interaction.deleteMany({ question: questionId });
    await Question.findByIdAndDelete(questionId);

    revalidatePath(path);
  } catch (err) {
    console.log(err);
  }
};

export const updateQuestion = async (params: any) => {
  try {
    connectDb();
    const { title, content, tags, path, questionId } = params;
    await Question.findByIdAndUpdate(questionId, {
      $set: { title, content },
    });

    const question = await Question.findById(questionId);

    for (let i = 0; i < question.tags.length; i++) {
      await Tag.findByIdAndUpdate(question.tags[i], {
        $pull: { questions: questionId },
      });
    }

    const tagDocuments = [];

    for (let i = 0; i < tags.length; i++) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tags[i]}$`, "i") } },
        {
          $setOnInsert: { name: tags[i] },
          $push: { questions: questionId },
        },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag?._id);
    }

    await Question.findByIdAndUpdate(questionId, {
      $set: { tags: tagDocuments },
    });

    revalidatePath(path);
  } catch (err) {
    console.log(err);
  }
};

export const getTopQuestions = async (params: any) => {
  try {
    connectDb();
    const questions = await Question.find()
      .sort({ views: -1, upvotes: -1 })
      .limit(5);
    return { questions };
  } catch (err) {
    console.log(err);
  }
};
