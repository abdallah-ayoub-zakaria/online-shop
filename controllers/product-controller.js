const productsModel=require('../models/product-model')
exports.getFirstProduct=(req,res,next)=>{
    productsModel.getProductFirstModel().then(product =>{
        res.render('product',{
            product:product
        })
    })
};
exports.getProduct=(req,res,next)=>{
    let id=req.params.id
    productsModel.getProductModel(id).then((product)=>{
        res.render('product',{
            product:product
        })
    })
}