const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: ["JUGADOR", "ENTRENADOR", "PRESIDENTE"],
      default: "JUGADOR",
    },
  },
  {
    timestamps: true,
  }
)

const User = model("User", userSchema)

module.exports = User
