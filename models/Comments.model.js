
const mongoose = require('mongoose')
const { Schema, model } = require("mongoose")

const commentSchema = new Schema(
    {
        description: { type: String },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },

    },
    {
        timestamps: true,
    }
)

const Comments = model("Comments", commentSchema)

module.exports = Comments