const mongoose = require('mongoose')
const { Schema, model } = require("mongoose")

const eventSchema = new Schema(
  {
    name: { type: String },
    address: { type: String },
    eventName: { type: String },
    description: { type: String },
    date: { type: Date },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    participants: [{
      type: mongoose.Types.ObjectId,
      ref: 'User',
    }],
    comments: [{
      type: mongoose.Types.ObjectId,
      ref: 'Comments',
    }]

  },
  {
    timestamps: true,
  }
)

const Event = model("Event", eventSchema)

module.exports = Event
