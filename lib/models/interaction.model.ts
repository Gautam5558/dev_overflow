import mongoose, { Document, Schema } from "mongoose";

export interface interactionSchemaType extends Document {
  userId: Schema.Types.ObjectId;
  typeOfInteraction: string;
  question: Schema.Types.ObjectId;
  answer: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  createdAt: Date;
}

const interactionSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  typeOfInteraction: {
    type: String,
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  answer: {
    type: Schema.Types.ObjectId,
    ref: "Answer",
  },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Interaction =
  mongoose.models.Interaction ||
  mongoose.model("Interaction", interactionSchema);
export default Interaction;
