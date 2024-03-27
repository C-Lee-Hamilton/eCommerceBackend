import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

var SellerSchema = new Schema({
  email: { type: String, unique: true, required: true },
  businessName: { type: String, unique: true, required: true },
  businessID: { type: String, unique: true, required: true },
  taxID: { type: String, unique: true, required: false },
  photo: { type: Array, required: false },
  addresses: { type: Array, unique: false, required: false },
});

SellerSchema.plugin(passportLocalMongoose);

export default mongoose.models.Seller || mongoose.model("Seller", SellerSchema);
