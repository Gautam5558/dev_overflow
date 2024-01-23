"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../connectdb";
import Answer from "../models/answer.model";
import User from "../models/user.model";

export const createAnswer = async (params: any) => {
  try {
    connectDb();
    const { content, clerkId, questionId, path } = params;

    const user = await User.findOne({ clerkId });

    const answer = new Answer({
      content,
      author: user._id,
      questionId,
    });
    await answer.save();
    revalidatePath(path);
  } catch (err) {
    console.log(err);
  }
};

export const getAnswers = async (params: any) => {
  try {
    connectDb();
    const { questionId } = params;
    const answers = await Answer.find({ questionId }).populate({
      path: "author",
      model: User,
    });
    return answers;
  } catch (err) {
    console.log(err);
  }
};

export const handleAnswerUpvote = async (params: any) => {
  try {
    connectDb();
    const { userId, questionId, path } = params;
    const answer = await Answer.findById(questionId);
    const isIncludedUpvote = answer.upvotes.includes(userId);
    const isIncludedDownvote = answer.downvotes.includes(userId);
    if (isIncludedUpvote) {
      await Answer.findByIdAndUpdate(questionId, {
        $pull: { upvotes: userId },
      });
    } else if (!isIncludedUpvote && isIncludedDownvote) {
      await Answer.findByIdAndUpdate(questionId, {
        $push: { upvotes: userId },
      });
      await Answer.findByIdAndUpdate(questionId, {
        $pull: { downvotes: userId },
      });
    } else {
      await Answer.findByIdAndUpdate(questionId, {
        $push: { upvotes: userId },
      });
    }
    revalidatePath(path);
    return { userId };
  } catch (err) {
    console.log(err);
  }
};

export const handleAnswerDownvote = async (params: any) => {
  try {
    connectDb();
    const { userId, questionId, path } = params;
    const answer = await Answer.findById(questionId);
    const isIncludedDownvote = answer.downvotes.includes(userId);
    const isIncludedUpvote = answer.upvotes.includes(userId);
    if (isIncludedDownvote) {
      await Answer.findByIdAndUpdate(questionId, {
        $pull: { downvotes: userId },
      });
    } else if (!isIncludedDownvote && isIncludedUpvote) {
      await Answer.findByIdAndUpdate(questionId, {
        $push: { downvotes: userId },
      });
      await Answer.findByIdAndUpdate(questionId, {
        $pull: { upvotes: userId },
      });
    } else {
      await Answer.findByIdAndUpdate(questionId, {
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
