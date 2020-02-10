const mongoose= require('mongoose')
const db='mongodb://localhost:27017/online-shop'
const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    description:String,
    image:String
})
const product=mongoose.model('products',productSchema)
exports.getProductFirstModel=()=>{
    return new Promise((resolve ,reject)=>{
        mongoose.connect(db).then(()=>{
            return product.findOne({})
        }).then(product=>{
            mongoose.disconnect()
            resolve(product)
        }).catch(err=>reject(err))

    })
}



exports.getProductModel=(id)=>{
    return new Promise((resolve ,reject)=>{
        mongoose.connect(db).then(()=>{
            return product.findById(id)
        }).then(product=>{
            mongoose.disconnect()
            resolve(product)
        }).catch(err=>reject(err))

    })
}

