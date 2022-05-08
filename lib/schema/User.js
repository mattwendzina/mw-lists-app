import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});
const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  titleLower: {
    type: String,
    required: true,
  },
  items: {
    type: [ItemsSchema],
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

// Useful tutorial for validation and other Mongose features:
// https://www.youtube.com/watch?v=DZBGEVgL2eE&ab_channel=WebDevSimplified
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [6, "Your username needs to be longer"],
    maxlength: [20, "Your username needs to be shorter"],
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: [8, "Your password needs to be longer"],
    required: true,
  },
  lists: [listSchema],
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

// This is like a middleware that allows you to run actions before different functions
// e.g. In this case, before 'save', run 'updatedAt'. See near end of below tutorial for more info:
// https://www.youtube.com/watch?v=DZBGEVgL2eE&ab_channel=WebDevSimplified
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// The OR operator is a fix for the error - cannot overwrite model once compiled...
// See more here - https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
export const User = mongoose.models.User || mongoose.model("User", userSchema);
