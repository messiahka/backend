import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        },
        quantity: {
            type: Number,
            required: true
           },
    }],
})

cartSchema.pre('find', function(next){
    this.populate('products.product');
    next();
});

export const CartsModel =  mongoose.model("Carts", cartSchema);


// Para cargar en JSON con este formato
// {
//   "products": [
//         {
//           "product": "63ee9923ced98866244f5ca1",
//           "quantity": 10
//         }
//       ]
// }