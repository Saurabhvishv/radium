const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

  title:{
      type:String,
      required: "title is required",
      unique: true
  },
  description:{
      type:String,
      required: "description is required"
  },
  price:{
      type: Number,
      required: "price is required",
      
  }







}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema, 'products')