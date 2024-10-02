import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    name: String,
    startDate: Date,
    endDate: Date,
    description: String,
    upload: String,
    level: String,
  },
  {
    timestamps: true,
  }
);


const Topic = mongoose.models.Topic ||mongoose.model("Topic", topicSchema)

export default Topic;