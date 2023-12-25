import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

const StatusSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    required: true,
  },

  comments: [String], // You can keep this field separate if needed.
});

// StatusSchema.plugin(passportLocalMongoose);

export default mongoose.models.Statuses ||
  mongoose.model("Status", StatusSchema);
