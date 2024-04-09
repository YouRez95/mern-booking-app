import { Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface IUserMethods {
  isMatch(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.method("isMatch", async function isMatch(passwordPlainText) {
  return await bcrypt.compare(passwordPlainText, this.password);
});

const User = model<IUser, UserModel>("User", userSchema);

export default User;
