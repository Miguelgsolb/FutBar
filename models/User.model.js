const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    imageUrl: { type: String },
    role: {
      type: String,
      enum: ["PLAYER", "MANAGER", "PRESIDENT"],
      default: "PLAYER",
    },
  },
  {
    timestamps: true,
  }
)

const User = model("User", userSchema)

module.exports = User
