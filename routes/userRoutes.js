const express=require('express');
const router=express.Router();
const {isLoggedIn}=require('../middleware');
const User=require('../models/user')
const Product=require('../models/product') 



router.post('/doctors/saved/:pid/add',isLoggedIn,async(req,res)=>{
    const uid=req.user.id;
    const {pid}=req.params;
    const user=await User.findById(uid);
    if(!user.cart.includes(pid))user.cart.push(pid);
    await user.save();
    req.flash('message','Doctor successfully saved');
    res.redirect('/doctors');
})

router.get('/saved',isLoggedIn,async(req,res)=>{
    const user=req.user;
    await user.populate('cart');
    const products=user.cart;
    res.render('user/cart',{products});
})  

router.delete('/doctors/saved/:pid',isLoggedIn,async(req,res)=>{
    const uid=req.user.id;
    const {pid}=req.params;
    const user=await User.findById(uid);
    user.cart=user.cart.filter((id)=>id!=pid);
    await user.save();
    req.flash('error','Doctor removed from saved');
    res.redirect('/saved');
})

router.get('/mydoctors',isLoggedIn,async(req,res)=>{
    const products=await Product.find({creator:req.user.id});
    res.render('user/myproducts',{products});
});

router.get('/about',(req,res)=>{
    res.render('user/creator');
})

module.exports=router;
