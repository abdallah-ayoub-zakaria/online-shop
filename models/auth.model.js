const mongoose=require('mongoose')
const bcryptjs=require('bcryptjs')
const db='mongodb://localhost:27017/online-shop'
const userSchema=mongoose.Schema({username:String, email:String, password:String})
const User=mongoose.model('user',userSchema)
exports.CreateNewAccount=(username,email,password)=>{
    return new Promise((resolve ,reject)=>{mongoose.connect(db).then(()=>{
            return User.findOne({email: email})
        }).then(user=>{
            if(user){mongoose.disconnect()
                reject('Email is used')
            } else {return bcryptjs.hash(password,10)
            }
        }).then(hashedPassword=>{let user=new User({ username:username, email:email, password:hashedPassword})
            return user.save()}).then(()=>{  mongoose.disconnect()
            resolve()}).catch(err=>{ mongoose.disconnect()
            reject(err)})})
}
exports.Login=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db).then(()=>User.findOne({email:email}))
            .then(user=>{
            if(!user){mongoose.disconnect()
                reject('There is no user matches this email')
            }else {bcryptjs.compare(password,user.password).then(same=>{
                    if(!same){mongoose.disconnect()
                        reject('Password is incorrect')
                    }else {mongoose.disconnect()
                        resolve(user._id)
                    }})}}).catch(err =>{mongoose.disconnect()
            reject(err)})})
}
