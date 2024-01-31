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

    // Incrementing reputation of User whose created answer  by 10
    await User.findByIdAndUpdate(user._id, { $inc: { reputation: 10 } });

    revalidatePath(path);
  } catch (err) {
    console.log(err);
  }
};

export const getAnswers = async (params: any) => {
  try {
    connectDb();
    const { questionId, filter, page = 1, pageSize = 5 } = params;

    const numberOfAnswersToSkip = (page - 1) * pageSize;

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
      .skip(numberOfAnswersToSkip)
      .limit(pageSize)
      .sort(sortOptions);

    const myTotalAnswers = await Answer.find({ questionId });
    const isNext =
      myTotalAnswers.length > numberOfAnswersToSkip + answers.length;

    return { answers, isNext, totalAnswers: myTotalAnswers.length };
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
      await User.findByIdAndUpdate(userId, { $inc: { reputation: -2 } });
      await User.findByIdAndUpdate(answer.author, {
        $inc: { reputation: -10 },
      });
    } else if (!isIncludedUpvote && isIncludedDownvote) {
      await Answer.findByIdAndUpdate(questionId, {
        $push: { upvotes: userId },
      });
      await Answer.findByIdAndUpdate(questionId, {
        $pull: { downvotes: userId },
      });

      await User.findByIdAndUpdate(answer.author, { $inc: { reputation: 20 } });
    } else {
      await Answer.findByIdAndUpdate(questionId, {
        $push: { upvotes: userId },
      });
      await User.findByIdAndUpdate(userId, { $inc: { reputation: 2 } });
      await User.findByIdAndUpdate(answer.author, { $inc: { reputation: 10 } });
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
      await User.findByIdAndUpdate(userId, { $inc: { reputation: -2 } });
      await User.findByIdAndUpdate(answer.author, { $inc: { reputation: 10 } });
    } else if (!isIncludedDownvote && isIncludedUpvote) {
      await Answer.findByIdAndUpdate(questionId, {
        $push: { downvotes: userId },
      });
      await Answer.findByIdAndUpdate(questionId, {
        $pull: { upvotes: userId },
      });
      await User.findByIdAndUpdate(answer.author, {
        $inc: { reputation: -20 },
      });
    } else {
      await Answer.findByIdAndUpdate(questionId, {
        $push: { downvotes: userId },
      });
      await User.findByIdAndUpdate(userId, { $inc: { reputation: 2 } });
      await User.findByIdAndUpdate(answer.author, {
        $inc: { reputation: -10 },
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
    const { userId, page = 1, pageSize = 5 } = params;

    const numberOfAnswersToSkip = (page - 1) * pageSize;

    const answers = await Answer.find({ author: userId })
      .skip(numberOfAnswersToSkip)
      .limit(pageSize)
      .sort({
        upvotes: -1,
        createdAt: -1,
      });

    const myAnswersTotal = await Answer.find({ author: userId });
    const isNext =
      myAnswersTotal.length > numberOfAnswersToSkip + answers.length;

    return { answers, isNext };
  } catch (err) {
    console.log(err);
  }
};

export const deleteAnswer = async (params: any) => {
  try {
    connectDb();
    // Before deleting the answer deal with removing reputation of user who created the answer and users who upvoted and downvoted the answer
    const answer = await Answer.findById(params.answerId);
    const totalUpvotes = answer.upvotes.length;
    const totalDownvotes = answer.downvotes.length;
    const userReputationToBeDecreased =
      totalUpvotes * 10 - totalDownvotes * 10 + 10;
    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: -userReputationToBeDecreased },
    });
    // Now deleting upvoted and downvoted users reputation
    for (let i = 0; i < answer.upvotes.length; i++) {
      await User.findByIdAndUpdate(answer.upvotes[i], {
        $inc: { reputation: -2 },
      });
    }
    for (let i = 0; i < answer.downvotes.length; i++) {
      await User.findByIdAndUpdate(answer.downvotes[i], {
        $inc: { reputation: -2 },
      });
    }
    await Answer.findByIdAndDelete(params.answerId);
    revalidatePath(params.path);
  } catch (err) {
    console.log(err);
  }
};
