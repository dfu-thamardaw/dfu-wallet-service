import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: { type: String, unique: true },
  address: String,
  version: Number,
  type: String,
  meta: {
    signingKey: {
      mnemonic: String,
      privateKey: String,
    },
  },
});

export const User = mongoose.model("User", userSchema);
