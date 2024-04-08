import mongoose, { models, model, Schema  } from "mongoose";

const promptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, "Prompt required"],
    },
    tag:{
        type: String,
        required: [true, "Tag required"]
    }
})

const Prompt = models.Prompt || model("Prompt", promptSchema);
export default Prompt;