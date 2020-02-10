const homeModel=require('../models/home-model')
exports.getHome = (req, res, next) => {
    let category = req.query.category
    let validCategory=['clothes','phones','computers']
    let productPromise
    if (category && validCategory.includes(category))
       productPromise= homeModel.homeCategoryModel(category)
    else productPromise=homeModel.getProductModel()
    productPromise.then(products => {
        res.render('index', {
            products: products,
            isUser:true
        })
    })
}
