"use server";

import { connectDb } from "../connectdb";
import Interaction from "../models/interaction.model";
import Question from "../models/question.model";

export const questionView = async (params: any) => {
  try {
    connectDb();
    const { userId, questionId } = params;
    await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });

    if (userId) {
      // first find whether an old interaction of this userId and questionId exists or not
      const interaction = await Interaction.findOne({
        userId,
        question: questionId,
        typeOfInteraction: "view",
      });
      if (interaction) {
        return console.log("interaction already exists");
      }
      const newInteraction = new Interaction({
        userId,
        question: questionId,
        typeOfInteraction: "view",
      });
      await newInteraction.save();
    } else {
      return console.log(
        "View incremented but interaction not created since user isn't logged in"
      );
    }
  } catch (err) {
    console.log(err);
  }
};
