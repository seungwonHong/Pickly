import mongoose from "mongoose";

const YoutubeVideoSchema = new mongoose.Schema(
  {
    query: { type: String, required: true, unique: true },
    videoData: {
      videoId: String,
      title: String,
      thumbnail: String,
      publishedAt: String,
    },
  },
  { timestamps: true }
);

export const YoutubeVideoModel =
  mongoose.models.YoutubeVideo ||
  mongoose.model("YoutubeVideo", YoutubeVideoSchema);
