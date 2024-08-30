import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "nama tidak boleh kosong"],
        index: true,
        unique: [true, "nama sudah pernah digunakan"],
    },
    email: {
        type: String,
        required: [true, "email tidak boleh kosong"],
        index: true,
        unique: [true, "email sudah pernah digunakan"],
        validate: {
            validator: validator.isEmail,
            message: "inputan harus berformat email foo@mail.com",
        },
    },
    password: {
        type: String,
        required: [true, "password tidak boleh kosong"],
        minLength: [6, "password minimal 6 karakter"],
    },
    role: {
        type: String,
        enum: ["owner", "user"],
        default: "user",
    },
});

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (reqBody) {
    return await bcrypt.compare(reqBody, this.password);
};

const users = mongoose.model("user", userSchema);

export default users;
