import mongoose from "mongoose";

import passportLocalMongoose from "passport-local-mongoose";
const Schema = mongoose.Schema;

var QuizSchema = new Schema({
  title: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  quiz: { type: Array, required: true },
});
QuizSchema.plugin(passportLocalMongoose);

export default mongoose.models.Quiz || mongoose.model("Quizzes", QuizSchema);
