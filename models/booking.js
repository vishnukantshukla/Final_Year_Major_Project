const mongoose=require('mongoose');


const schema=new mongoose.Schema({
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        required:true
    },
    hospital:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:"String",
        required:true
    },
    time_slot:{
        type:'String',
        required:true
    }
})

const bookings=mongoose.model('booking',schema);
module.exports=bookings;