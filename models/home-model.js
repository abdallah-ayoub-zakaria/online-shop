const mongoose= require('mongoose')
const db='mongodb://localhost:27017/online-shop'
const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    description:String,
    image:String
})
const product=mongoose.model('product',productSchema)
exports.getProductModel=()=>{
    return new Promise((resolve ,reject)=>{
        mongoose.connect(db).then(()=>{
            return product.find({})
        }).then(products=>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err=>reject(err))

    })
}
exports.homeCategoryModel=(category)=>{
    return new Promise((resolve ,reject)=>{
        mongoose.connect(db).then(()=>{
            return product.find({category:category})
        }).then(products=>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err=>reject(err))

    })
}