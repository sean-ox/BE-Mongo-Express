import mongoose from "mongoose";

const { Schema } = mongoose;

const singleProducts = Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Products",
        required: true,
    },
});

const orderSchema = new Schema({
    itemsDetails: [singleProducts],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    },
    firstName: {
        type: String,
        required: [true, "First Name harus di isi"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name harus di isi"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone Number harus di isi"],
    },
    email: {
        type: String,
        required: [true, "email harus di isi"],
    },
    total: {
        type: Number,
        required: [true, "Total harus di isi"],
    },
    status: {
        type: String,
        enum: ["panding", "failed", "success"],
        default: "panding",
    },
});

const order = mongoose.model("order", orderSchema);

export default order;
