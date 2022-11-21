const { Schema, model } = require("mongoose")

const eventSchema = new Schema(
  {
    name: { type: String },
    address: { type: String },
    eventName:{type:String},
    description: { type: String },
 /*    date:Date */

  },
  {
    timestamps: true,
  }
)

const Event = model("Event", eventSchema)

module.exports = Event
