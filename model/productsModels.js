import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "nama tidak boleh kosong"],
        index: true,
        unique: [true, "nama sudah pernah digunakan"],
    },
    price: {
        type: Number,
        required: [true, "price tidak boleh kosong"],
    },
    description: {
        type: String,
        required: [true, "description tidak boleh kosong"],
    },
    image: {
        type: String,
        default: null,
    },
    category: {
        type: String,
        required: [true, "kategori tidak boleh kosong"],
        enum: ["baju", "kemeja", "celana", "sepatu"],
    },
    stock: {
        type: Number,
        required: [true, "stock tidak boleh kosong"],
        default: 0,
    },
});

const Product = mongoose.model("Products", ProductSchema);

export default Product;
