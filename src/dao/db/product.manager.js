import { productModel } from "../models/product.model.js";

export default class ProductManager{
    constructor(){}

    addProduct = async(pProduct) => {
        try {
            if(!pProduct.code||!pProduct.title||!pProduct.description||!pProduct.price||!pProduct.thumbnail||!pProduct.stock){
                throw new Error();
            }
            let code = pProduct.code;
            let title = pProduct.title;
            let description = pProduct.description;
            let price = pProduct.price;
            let thumbnail = pProduct.thumbnail;
            let stock = pProduct.stock;
            let status = true;
            let result = await productModel.create({
                code,
                status,
                title,
                description,
                price,
                stock,
                thumbnail
            });
            return({status:'success', message: 'Se agregó el producto'});
        } catch (ex) {
            return({status:'error', message: 'No se agregó el producto'});
        }
    }

    getProducts = async(pLimit, pPage, pQuery, pSort) => {
        try {

            //Valida los datos para evitar errores
            let limit = pLimit || 10;
            let page = pPage || 1;
            let query = {};
            if(pQuery){
                query = {
                    title: pQuery
                }
            }
            let sort;
            if(pSort == 'asc'){
                sort = 1;
            }else if(pSort == 'desc'){
                sort = -1;
            }
            else{
                sort = 1;
            }

            //Devuelve el objeto pedido con status, payload y el resto de data
            let {docs, ...rest} = await productModel.paginate(query, {limit: limit, page: page, sort: {price: sort}, lean: true});
            return({status:'success', message: {status: 'success', payload: docs, ...rest}});
        } catch (ex) {
            return({status:'error', message: 'Productos no encontrados'})
        }
    }

    getProductById = async(pId) => {
        try {
            let products = await productModel.find({_id: pId});
            return({status:'success', message: products});
        } catch (ex) {
            return({status:'error', message: 'Productos no encontrados'})
        }
    }

    updateProduct = async(pId, pProduct) => {
        try {
            let result = await productModel.updateOne({_id: pId}, pProduct);
            return({status:'success', message: 'Producto actualizado'});
        } catch (ex) {
            return({status:'error', message: 'Producto no actualizado'});
        }
    }

    deleteProduct = async(pId) => {
        try {
            let result = await productModel.deleteOne({_id: pId});
            return({status:'success', message:'Producto eliminado'});
        } catch (ex) {
            return({status:'error', message:'Producto no eliminado'});
        }
    }
}