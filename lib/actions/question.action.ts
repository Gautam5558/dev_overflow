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

    // Whenever a user creates a question add reputation by +5
    await User.findByIdAndUpdate(author, {
      $inc: { reputation: 5 },
    });

    revalidatePath(path);
  } catch (err) {
    console.log(err);
  }
};

export const getQuestions = async (params: any) => {
  try {
    connectDb();
    const { search, filter, page = 1, pageSize = 20 } = params;

    // First we have to calculate total question to skip on the basis of current page nuumber
    const numberQuestionToSkip = (page - 1) * pageSize;

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
        sortOptions = { createdAt: -1 };
        break;
    }

    // TODO=> Implementation of recommended filter after creating the recommendation system

    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip(numberQuestionToSkip)
      .limit(pageSize)
      .sort(sortOptions);

    const totalQuestions = await Question.countDocuments();

    const isNext = totalQuestions > numberQuestionToSkip + questions.length;

    return { questions, isNext };
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

      // Handling reputation for this case
      // Since I've cancelled my upvote hence i will -1 my reputation as when I upvoted it
      // I incremented it by +1
      await User.findByIdAndUpdate(userId, { $inc: { reputation: -1 } });

      // Decrementing reputation of User whose question is upvoted by -10
      await User.findByIdAndUpdate(question.author[0], {
        $inc: { reputation: -10 },
      });
    } else if (!isIncludedUpvote && isIncludedDownvote) {
      await Question.findByIdAndUpdate(questionId, {
        $push: { upvotes: userId },
      });
      await Question.findByIdAndUpdate(questionId, {
        $pull: { downvotes: userId },
      });
      // Incrementing reputation of User whose question is upvoted by 20(10+10)
      await User.findByIdAndUpdate(question.author[0], {
        $inc: { reputation: 20 },
      });
    } else {
      await Question.findByIdAndUpdate(questionId, {
        $push: { upvotes: userId },
      });

      // Handling reputation for this case
      await User.findByIdAndUpdate(userId, { $inc: { reputation: 1 } });

      // Incrementing reputation of User whose question is upvoted by 10
      await User.findByIdAndUpdate(question.author[0], {
        $inc: { reputation: 10 },
      });
    }

    revalidatePath(path);
    return { userId, hasUpvoted: !isIncludedUpvote };
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
      await User.findByIdAndUpdate(userId, { $inc: { reputation: -1 } });
      // Incrementing reputation of User whose question is upvoted by 10
      await User.findByIdAndUpdate(question.author[0], {
        $inc: { reputation: 10 },
      });
    } else if (!isIncludedDownvote && isIncludedUpvote) {
      await Question.findByIdAndUpdate(questionId, {
        $push: { downvotes: userId },
      });
      await Question.findByIdAndUpdate(questionId, {
        $pull: { upvotes: userId },
      });
      // Decrementing reputation of User whose question is upvoted by -20
      await User.findByIdAndUpdate(question.author[0], {
        $inc: { reputation: -20 },
      });
    } else {
      await Question.findByIdAndUpdate(questionId, {
        $push: { downvotes: userId },
      });
      await User.findByIdAndUpdate(userId, { $inc: { reputation: 1 } });
      // Decrementing reputation of User whose question is upvoted by 10
      await User.findByIdAndUpdate(question.author[0], {
        $inc: { reputation: -10 },
      });
    }
    revalidatePath(path);
    // We actually dont need to return anything , we are just returning for the sake of it
    return { userId, hasDownvoted: !isIncludedDownvote };
  } catch (err) {
    console.log(err);
  }
};

export const getTopQuestionsUser = async (params: any) => {
  try {
    connectDb();
    const { userId, page = 1, pageSize = 5 } = params;

    const numberQuestionsToSkip = (page - 1) * pageSize;

    const questions = await Question.find({ author: [userId] })
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip(numberQuestionsToSkip)
      .limit(pageSize)
      .sort({ views: -1, createdAt: -1 });

    const myTotalQuestions = await Question.find({ author: [userId] });
    const isNext =
      myTotalQuestions.length > numberQuestionsToSkip + questions.length;

    return { questions, isNext };
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
    // Deleting reputation of user who created question and users who upvoted and downvoted question
    const userReputationTobeDeleted =
      question.upvotes.length * 10 - question.downvotes.length * 10 + 5;
    await User.findByIdAndUpdate(question.author[0], {
      $inc: { reputation: -userReputationTobeDeleted },
    });
    // Now deleting upvotes and downvotes user reputation
    for (let i = 0; i < question.upvotes.length; i++) {
      await User.findByIdAndUpdate(question.upvotes[i], {
        $inc: { reputation: -1 },
      });
    }
    for (let i = 0; i < question.downvotes.length; i++) {
      await User.findByIdAndUpdate(question.downvotes[i], {
        $inc: { reputation: -1 },
      });
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

export const getRecommendedQuestions = async (params: any) => {
  try {
    connectDb();
    const { userId, search, page = 1, pageSize = 10 } = params;
    const user = await User.findOne({ clerkId: userId });

    // First we have to calculate total question to skip on the basis of current page nuumber
    const numberQuestionToSkip = (page - 1) * pageSize;

    const interactions = await Interaction.find({ userId: user._id })
      .populate({ path: "tags", model: Tag })
      .exec();

    // Extract tags from user interactions

    const userTags = await interactions.reduce((tags, interaction) => {
      if (interaction.tags) {
        tags = tags.concat(interaction.tags);
      }
      return tags;
    }, []);

    // Get distict tagId's from user interactions

    const distinctTagIds = [
      // @ts-ignore
      ...new Set(userTags.map((tag: any) => tag._id)),
    ];

    const query: FilterQuery<typeof Question> = {
      $and: [
        { author: { $ne: [user._id] } }, // Exclude user's own questions
        { tags: { $in: distinctTagIds } }, // Questions with user tags
      ],
    };

    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { content: { $regex: new RegExp(search, "i") } },
      ];
    }

    const totalQuestions = await Question.countDocuments(query);

    const recommendedQuestions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip(numberQuestionToSkip)
      .limit(pageSize);

    const isNext =
      totalQuestions > numberQuestionToSkip + recommendedQuestions.length;
    return { questions: recommendedQuestions, isNext };
  } catch (err) {
    console.log(err);
  }
};
