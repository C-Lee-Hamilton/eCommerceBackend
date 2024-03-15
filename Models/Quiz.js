import mongoose from "mongoose";

const Schema = mongoose.Schema;

var QuizSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: false },
  quiz: { type: Array, required: true },
});

export default mongoose.models.Quiz || mongoose.model("Quizzes", QuizSchema);
