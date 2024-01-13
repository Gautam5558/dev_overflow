import mongoose, { Document, Schema } from "mongoose";

export interface tagSchemaType extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);
export default Tag;
