import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../model/productsModels.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const CreateProducts = asyncHandler(async (req, res) => {
    const newProducts = await Product.create(req.body);

    return res.status(201).json({
        message: "data berhasil di tambahkan",
        data: newProducts,
    });
});

export const AllProducts = asyncHandler(async (req, res) => {
    // Req Query
    const queryObj = { ...req.query };

    // fungsi untuk mengabaikan jika ada req Page dan Limit
    const excludeField = ["page", "limit", "name"];
    excludeField.forEach((element) => delete queryObj[element]);

    let query;
    if (req.query.name) {
        query = Product.find({
            name: { $regex: req.query.name, $options: "i" },
        });
    } else {
        query = Product.find(queryObj);
    }

    // Paginantion
    const page = req.query.page * 1 || 1;
    const limitData = req.query.limit * 1 || 30;
    const skipData = (page - 1) * limitData;

    query.skip(skipData).limit(limitData);

    const countProducts = await Product.countDocuments();
    if (req.query.page) {
        if (skipData >= countProducts) {
            res.status(400);
            throw new Error("This Page Doest exist");
        }
    }

    const queryDataProduct = await query;

    return res.status(200).json({
        message: "list data products",
        data: queryDataProduct,
        count: countProducts,
    });
});

export const DetailsProducts = asyncHandler(async (req, res) => {
    const param = req.params.id;
    const dataProducts = await Product.findById(param);

    if (!dataProducts) {
        throw new Error("details products tidak ditemukan");
    }

    return res.status(200).json({
        message: "details products",
        data: dataProducts,
    });
});

export const UpdateProducts = asyncHandler(async (req, res) => {
    const param = req.params.id;
    const updateDataProducts = await Product.findByIdAndUpdate(
        param,
        req.body,
        {
            runValidators: false,
            new: true,
        }
    );

    return res.status(200).json({
        message: "data berhasil di update",
        data: updateDataProducts,
    });
});

export const DeleteProducts = asyncHandler(async (req, res) => {
    const param = req.params.id;

    await Product.findByIdAndDelete(param);

    return res.status(200).json({
        message: "data berhasil di hapus",
    });
});

export const UploadFile = asyncHandler(async (req, res) => {
    const stream = cloudinary.uploader.upload_stream(
        {
            folder: "uploads",
            allowed_formats: ["png", "jpg", "jpeg"],
        },

        function (err, result) {
            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "gagal upload gambar",
                    error: err,
                });
            }
            res.status(201).json({
                message: "berhasil upload gambar",
                url: result,
            });
        }
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);
});
