const { url } = require('inspector');
const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    name:String,
    img:{
        type:String,
        trim:true,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDNDRbmyobKO3TL_AFnPNaGZGrJYII6aDzzw&usqp=CAU'
    },
    price:String,
    desc:String,
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }],
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

const model=mongoose.model('products',schema);

module.exports=model;