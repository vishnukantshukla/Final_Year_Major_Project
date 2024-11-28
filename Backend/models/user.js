const mongoose=require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const schema=new mongoose.Schema({
    Name:{
        type:String,
        trim:true
    },
    bio:{
        type:String,
        trim:true
    },
    Address:{
        type:String,
        trim:true
    },
    image:{
        type:String,
        trim:true,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjtNBgCacCwHhxVPj1ubPRygdT7X_7w_UrLQ&usqp=CAU'
    },
    email:{
        type:String,
        trim:true
    },
    contact:{
        type:Number
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    }],
    profile:String,
    isAdmin:Boolean,
})

schema.plugin(passportLocalMongoose);
const user=mongoose.model('User',schema);
module.exports=user;