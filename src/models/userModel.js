const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: 'Name is required',
        trim: true,
    },
    lname: {
        type: String,
        required: 'Last name is required',
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message: 'Please fill a valid email address', isAsync: false
        }
    },
    profileImage: {
        type: String,
        required: 'profileImage url is required'
    },
    phone: {
        type: Number,
        trim: true,
        unique: true,
        required: 'Mobile number is required',
        validate: function (phone) {
            return /^\d{10}$/.test(phone)
        }, message: 'Please fill a valid phone number', isAsync: false
    },
    password: {
        type: String,
        trim: true,
        required: 'Password is required',
        //minLength: 8,
        //maxLength: 15
    },
    address: {
        shipping: {
            street: {
                type: String,
                required: "shipping street is required",
                trim: true
            },
            city: {
                type: String,
                required: "shopping city is required",
                trim: true
            },
            pincode: {
                type: String,
                required: "shopping pincode is required",
                trim: true
            }
        },
        billing: {
            street: {
                type: String,
                required: "billing street is required",
            },
            city: {
                type: String,
                required: "billing city is required",
                trim: true
            },
            pincode: {
                type: String,
                required: "billing pincode is required",
                trim: true
            }
        }
    },

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema, 'users')