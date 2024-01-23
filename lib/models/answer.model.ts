import mongoose, { Document, Schema } from "mongoose";

export interface AnswerModelType extends Document {
  author: Schema.Types.ObjectId;
  questionId: Schema.Types.ObjectId;
  content: string;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const answerSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  questionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Answer = mongoose.models.Answer || mongoose.model("Answer", answerSchema);

export default Answer;
