import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  score: { type: Number, required: false },
  highscore: { type: Number, required: false },
  image: { type: String, required: false },
  // score: { type: Number, required: false },
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.models.User || mongoose.model("SpotUser", UserSchema);
