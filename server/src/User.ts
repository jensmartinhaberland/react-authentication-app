import { Schema, model, connect } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
// interface User {
//   name: string;
//   password: string;
//   isAdmin: boolean;
// }

// 2. Create a Schema corresponding to the document interface.
// const userSchema = new Schema<User>({
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// 3. Create a Model.
// export const User = model<User>("User", userSchema);
export const User = model("User", userSchema);