import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
            quantity: { type: Number, required: true }
        }
    ]

   
    
})

//POPULATE 
cartSchema.pre('find', function(next) {
    this.populate('products.product')
    next()
})

export const CartsModel = mongoose.model('Cart', cartSchema)