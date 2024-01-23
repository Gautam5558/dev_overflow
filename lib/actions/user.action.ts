"use server";

import { connectDb } from "../connectdb";
import User from "../models/user.model";
import Question from "../models/question.model";
import { revalidatePath } from "next/cache";
import Tag from "../models/tag.model";

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
    const users = await User.find();
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
    const user = await User.findOne({ clerkId: params.clerkId });
    const questionIds = user.saved;
    const questions = [];
    for (let i = 0; i < questionIds.length; i++) {
      const question = await Question.findById(questionIds[i])
        .populate({ path: "tags", model: Tag })
        .populate({ path: "author", model: User });
      questions.push(question);
    }
    return { questions };
  } catch (err) {
    console.log(err);
  }
};
