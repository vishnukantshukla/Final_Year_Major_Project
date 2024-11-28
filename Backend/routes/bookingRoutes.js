const express=require('express');
const { isLoggedIn } = require('../middleware');
const user = require('../models/user');
const router=express.Router();
const product=require('../models/product');
const booking=require('../models/booking');

router.get('/book/:id',isLoggedIn,async(req,res)=>{
    const {id}=req.params;
    const products=await product.findById(id);
    await products.populate('creator');
    res.render('./booking/book',{products})
})
 
router.post('/book/:did',isLoggedIn,async(req,res)=>{
    const {did}=req.params;
    const doc=await product.findById(did);
    console.log(doc);
    const {date,time_slot}=req.body;
    await booking.create({
        doctor:did,
        hospital:doc.creator,
        patient:req.user.id,
        date,
        time_slot
    });
    console.log('booking done');
    req.flash('message','Doctor booked successfully');
    res.redirect('/doctors');
})

 
router.get('/bookings',isLoggedIn,async(req,res)=>{
    if(req.user.profile!='retailer'){
        const bookings=await booking.find({patient:req.user.id});
        for(let booking of bookings){
            await booking.populate('doctor');
        }
        res.render('./booking/booking',{bookings});
    }
    const bookings=await booking.find({hospital:req.user.id});
    console.log(bookings);
    for(let booking of bookings){
        await booking.populate('doctor');
        await booking.populate('patient');
    }
    res.render("./booking/hospital",{bookings});
}) 

router.delete('/booking/:id',isLoggedIn,async(req,res)=>{
    const {id}=req.params;
    await booking.findByIdAndDelete(id);
    req.flash('message','booking cancelled');
    res.redirect('/bookings');
})

module.exports=router;