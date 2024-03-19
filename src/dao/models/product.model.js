import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);