import mongoose from "mongoose";

const City = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    refresh_token: String,
    expires_in: Number
});

export default mongoose.model("City", City);
