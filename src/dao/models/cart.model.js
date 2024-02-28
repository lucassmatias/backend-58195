import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products:[{
        productId: Number,
        productQty: Number
    }]
})

export const cartModel = mongoose.model(cartCollection, cartSchema);