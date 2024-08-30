import asyncHandler from "../middleware/asyncHandler.js";
import order from "../model/orderModel.js";
import Product from "../model/productsModels.js";

export const CreateOrder = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phoneNumber, cartItem } = req.body;

    if (!cartItem || cartItem.length < 1) {
        res.status(400);
        throw new Error("keranjang masih kosong");
    }

    let orderItem = [];
    let total = 0;

    for (const cart of cartItem) {
        const produkData = await Product.findOne({ _id: cart.product });
        if (!produkData) {
            res.status(404);
            throw new Error("id product tidak di temukan");
        }

        const { name, price, _id } = produkData;
        const singleProducts = {
            quantity: cart.quantity,
            name,
            price,
            product: _id,
        };

        total += cart.quantity * price;
        orderItem = [...orderItem, singleProducts];
    }

    const dataOrder = await order.create({
        itemsDetails: orderItem,
        total,
        firstName,
        lastName,
        email,
        phoneNumber,
        user: req.user.id,
    });

    return res.status(201).json({
        total,
        dataOrder,
        message: "order berhasil di tambahkan",
    });
});

export const AllOrder = asyncHandler(async (req, res) => {
    const dataOrder = await order.find();

    return res.status(201).json({
        data: dataOrder,
        message: "All Order Success",
    });
});

export const DetailsOrder = asyncHandler(async (req, res) => {
    const dataOrder = await order.findById(req.params.id);

    return res.status(201).json({
        data: dataOrder,
        message: "Details Order Success",
    });
});

export const CurrentUserOrder = asyncHandler(async (req, res) => {
    const dataOrder = await order.find({ user: req.user.id });

    return res.status(201).json({
        data: dataOrder,
        message: "Current User Order Success",
    });
});
