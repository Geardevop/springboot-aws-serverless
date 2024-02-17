import mongoose from "mongoose";
import type { UserDocument} from "../types/mongoss.type";
const userSchema = new mongoose.Schema<UserDocument>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps:true})

const User = mongoose.model<UserDocument>("User", userSchema)

export default User