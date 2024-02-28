import mongoose from "mongoose";

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    code: Number,
    status: Boolean,
    title: String,
    description: String,
    price: Number,
    stock: Number,
    thumbnail: String
});

export const productModel = mongoose.model(productCollection, productSchema);