"use server";

import { connectDb } from "../connectdb";
import User from "../models/user.model";

export const getUser = async (params: any) => {
  try {
    connectDb();
    const { userId } = params;
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    console.log(err);
  }
};
