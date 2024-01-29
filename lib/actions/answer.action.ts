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
    const { questionId, filter } = params;

    let sortOptions = {};
    switch (filter) {
      case "highest upvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdOn: 1 };
        break;
      case "lowest upvotes":
        sortOptions = { createdOn: 1 };
        break;
      default:
        break;
    }

    const answers = await Answer.find({ questionId })
      .populate({
        path: "author",
        model: User,
      })
      .sort(sortOptions);
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

export const getUserAnswers = async (params: any) => {
  try {
    connectDb();
    const { userId } = params;
    const answers = await Answer.find({ author: userId }).sort({
      upvotes: -1,
      createdAt: -1,
    });
    return { answers };
  } catch (err) {
    console.log(err);
  }
};

export const deleteAnswer = async (params: any) => {
  try {
    connectDb();
    await Answer.findByIdAndDelete(params.answerId);
    revalidatePath(params.path);
  } catch (err) {
    console.log(err);
  }
};
