import mongoose from "mongoose";

const City = new mongoose.Schema({
    city: String,
    region: String
});

export default mongoose.model("City", City);
