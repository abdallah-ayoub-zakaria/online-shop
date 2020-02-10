const router=require('express').Router()
const productController=require('../controllers/home-controller')
const authGurad=require('./guard/auth-guard')

router.get('/',productController.getHome)
module.exports=router