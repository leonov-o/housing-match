import mongoose from "mongoose";

const Session = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    refresh_token: String,
    expires_in: Number
});

export default mongoose.model("Session", Session);
