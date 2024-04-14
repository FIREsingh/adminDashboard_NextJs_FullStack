import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

enum Role {
  admin = "admin",
  student = "student",
}
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: Role;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
}
const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "user name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(Role),
    required: true,
    default: "student",
  },
  verifyCode: {
    type: String,
    required: [true, "Verify Code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code Expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const UserModel =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);
export default UserModel;
