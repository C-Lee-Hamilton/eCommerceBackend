import mongoose from "mongoose";

const Schema = mongoose.Schema;

var OrderSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: false },
  quiz: { type: Array, required: true },
  views: { type: Number, required: false },
});

export default mongoose.models.Quiz || mongoose.model("Order", OrderSchema);
