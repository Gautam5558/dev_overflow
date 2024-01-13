import mongoose, { Document, Schema } from "mongoose";

export interface userSchemaType extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  portfolioWebsite: {
    type: String,
    required: false,
  },
  reputation: {
    type: String,
    default: 0,
  },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
