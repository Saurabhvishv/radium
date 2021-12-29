const cartModel = require("../models/cartModel")
const productModel = require("../models/productModel")
const mongoose = require("mongoose")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidrequestBody = function (requestBody) {
    return Object.keys(requestBody).length !== 0

}
const validObject = function (value) {
    return mongoose.Types.ObjectId.isValid(value)
}
// testing123
// testing again
const createCart = async function(req,res){
    try{
        let userId = req.params.userId
        let reqBody = req.body 
        const{items} = reqBody
        if(!validObject(userId)){
            return res.status(400).send({status: false, msg: "Invalid userId provided"})
        }
        let findUser = await cartModel.findOne({userId: userId})
        if(findUser){
            return res.status(400).send({status: false, msg: "cart for provided userId already exists"})
        }
        console.log(items)
        console.log(items[0].productId)
        console.log(items[0].quantity)
        if(!(items[0].productId && items[0].quantity)){
           return  res.status(400).send({status: false, msg: "productId and quantity is mandatory"})
        }
        // if(!totalPrice){
        //     res.status(400).send({status: false, msg: "total price is mandatory"})
        // }
        // if(!totalItems){
        //     res.status(400).send({status: false, msg: "total items is mandatory"})
        // }
        var pricearr =[]
        var qtyarr =[]
        for(let i=0; i<items.length; i++){
            let a = await productModel.findOne({_id: items[i].productId})
            let b = items[i].quantity
            pricearr.push(a.price*b)
            qtyarr.push(b)
        }
        let price = pricearr.reduce((pv,cv)=> pv+cv)
        let qty = qtyarr.reduce((pv,cv)=> pv+cv)
        let cart = {userId: userId, items: items, totalPrice: price, totalItems: qty}
        let create = await cartModel.create(cart)
        // console.log(create)
        if(create){
            return res.status(201).send({status: true, msg: "success", data: cart})
        }

    }catch(err){
        res.status(500).send({status: false, msg: err.message})
    }
}
module.exports.createCart = createCart

const updateCart = async function(req,res){
    try{
        let userId = req.params.userId
        let body = req.body
        const {cartId, productId, removeProduct} = body
        if(!validObject(userId)){
            res.status(400).send({status: false, msg: "Provide a valid userId"})
        }
        if(!validObject(cartId)){
            res.status(400).send({status: false, msg: "Provide a valid cartId"})
        }
        if(!validObject(productId)){
            res.status(400).send({status: false, msg: "Provide a valid userId"})
        }
        let findCart = await cartModel.findOne({_id: cartId})
        let itemsarr = findCart.items
        var updateItems =[]
        for(let r=0; r<itemsarr.length; r++){
            if(itemsarr[r].productId != productId){
                updateItems.push(itemsarr[r])
                
            }
        }
        if(removeProduct == 0){
            // let deleteProduct = await cartModel.find({_id: cartId,items:{$elemMatch:{_id : "61cabd1383e21cc2539407d8"}}}).remove()
        let deleteProduct = await cartModel.findOneAndUpdate({_id: cartId},
                 {items: updateItems}, {new: true})
        // let deleteProduct = cartModel.findOneAndUpdate( { _id:cartId}, { $pull: { items: [{ productId: productId }] } } )
            res.status(200).send({status: true, data: deleteProduct})
        }

        

    }catch(err){
        res.status(500).send({status: false, msg: err.message})
    }
}
module.exports.updateCart = updateCart

