"use server";

import { connectDb } from "../connectdb";
import User from "../models/user.model";
import Question from "../models/question.model";
import { revalidatePath } from "next/cache";
import Tag from "../models/tag.model";
import Answer from "../models/answer.model";
import { FilterQuery } from "mongoose";

export const getUser = async (params: any) => {
  try {
    connectDb();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (params: any) => {
  try {
    connectDb();
    const newUser = new User({ ...params });
    await newUser.save();
    revalidatePath("/community");
    return newUser;
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (params: any) => {
  try {
    connectDb();
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: params.clerkId },
      { ...params.updateData },
      { new: true }
    );
    // revalidate path of settings page todo

    return updatedUser;
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (params: any) => {
  try {
    connectDb();
    const user = await User.findOne({ clerkId: params.clerkId });

    //  const questionIds=await Question.find({author:user._id}).distinct("_id")

    await Question.deleteMany({ author: user._id });

    // TODO Delete answers corresponding to the question asked by the user
    // TODO Also delete all answers from ansers collection corresponding top the user questions

    const deletedUser = await User.deleteOne({ _id: user._id });
    return deletedUser;
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async (params: any) => {
  try {
    connectDb();
    const { search, filter } = params;
    const query: FilterQuery<typeof User> = {};
    if (search) {
      query.$or = [
        { username: { $regex: new RegExp(search, "i") } },
        { name: { $regex: new RegExp(search, "i") } },
      ];
    }

    let sortOptions = {};
    switch (filter) {
      case "new users":
        sortOptions = { joinedAt: -1 };
        break;
      case "old users":
        sortOptions = { joinedAt: 1 };
        break;
      case "top contributors":
        sortOptions = { reputation: -1 };
        break;
      default:
        break;
    }

    const users = await User.find(query).sort(sortOptions);
    return users;
  } catch (err) {
    console.log(err);
  }
};

export const savingQuestionHandle = async (params: any) => {
  try {
    connectDb();
    const { userId, questionId, path } = params;
    const user = await User.findById(userId);
    const isSaved = user.saved.includes(questionId);
    if (isSaved) {
      await User.findByIdAndUpdate(userId, { $pull: { saved: questionId } });
    } else {
      await User.findByIdAndUpdate(userId, { $push: { saved: questionId } });
    }
    revalidatePath(path);
  } catch (err) {
    console.log(err);
  }
};

export const getSavedQuestions = async (params: any) => {
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
      case "most recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most votes":
        sortOptions = { upvotes: -1 };
        break;
      case "most viewed":
        sortOptions = { views: -1 };
        break;
      case "most answered":
        sortOptions = { answers: -1 };
        break;
      default:
        break;
    }

    const user = await User.findOne({ clerkId: params.clerkId }).populate({
      path: "saved",
      model: "Question",
      options: {
        sort: sortOptions,
      },
      populate: [
        { path: "tags", model: Tag },
        { path: "author", model: User },
      ],
      match: query,
    });

    /* 2nd method to do same as above and send back array of saved questions
       But I am using above method because i have implemented local search using filter. 
      const questionIds = user.saved;
     const questions = [];
    for (let i = 0; i < questionIds.length; i++) {
      const question = await Question.findById(questionIds[i])
        .populate({ path: "tags", model: Tag })
        .populate({ path: "author", model: User });
      questions.push(question);
    }
    */
    return user;
  } catch (err) {
    console.log(err);
  }
};

export const getUserInfo = async (params: any) => {
  try {
    connectDb();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });

    const totalQuestions = await Question.countDocuments({
      author: [user._id],
    });
    const totalAnswers = await Answer.countDocuments({ author: user._id });
    return { user, totalAnswers, totalQuestions };
  } catch (err) {
    console.log(err);
  }
};

export const updateUserEdit = async (params: any) => {
  try {
    connectDb();
    const { userId, name, username, portfolioWebsite, bio, location, path } =
      params;
    await User.findByIdAndUpdate(userId, {
      $set: { name, username, location, portfolioWebsite, bio },
    });
    revalidatePath(path);
  } catch (err) {
    console.log(err);
  }
};
