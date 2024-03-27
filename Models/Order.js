import mongoose from "mongoose";

const Schema = mongoose.Schema;

var OrderSchema = new Schema({
  items: { type: Array, required: true },
  address: { type: String, required: true },
  total: { type: Number, required: true },
  date: { type: String, required: true },
  status: { type: String, required: false },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
