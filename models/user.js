import  { models, model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        maxLength: [30, "Cannot be more than 40 characters"],
        minLength: [2, "Should be more than 2 characters"],
        match: [/^(?=.{2,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 2-30 alphanumeric letters and be unique!"]
    },
    email:{
        type: String,
        required: [true, "Enter email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Enter Password"],
        minLength: [8, "Should be more than 8 characters"],
        select: false
    },
    image: {
        type: String
    }
});

const User = models.User || new model("User", userSchema);
export default User;