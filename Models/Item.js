import mongoose from "mongoose";

const Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  photos: { type: Array, required: false },
  category: { type: String, required: true },
  tags: { type: Array, required: false },
  status: { type: Boolean, required: true },
  sale: { type: Boolean, required: true },
  quantity: { type: Number, required: true },
  warranty: { type: String, required: false },
  specs: { type: String, required: false },
  weight: { type: String, required: true },
});

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);
