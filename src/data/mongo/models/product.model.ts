import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    available: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
})

productSchema.set('toJSON', {
    virtuals: true, // coloca el id
    versionKey: false, // elimina __v
    transform: function (doc, ret, options) { delete ret._id } // elimina el _id
})
export const ProductModel = mongoose.model('Product', productSchema)