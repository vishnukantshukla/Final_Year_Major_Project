const express=require('express');
const router=express.Router();
const product=require('../models/product');
const {isLoggedIn}=require('../middleware');

router.get('/doctors',async(req,res)=>{
    const products =await product.find();
    res.render('./products/product',{products});
})

router.get('/doctors/new',isLoggedIn,(req,res)=>{
    res.render('./products/new');
})
router.post('/doctors/new',isLoggedIn,async(req,res)=>{
    const {name,img,price,desc}=req.body; 
    await product.create({name,img,price,desc,creator:req.user.id});
    console.log("doctor added");
    req.flash('message','Doctor added successfully');
    res.redirect('/doctors');
})

router.get('/doctors/:prdid/edit',isLoggedIn,async(req,res)=>{
    const {prdid}=req.params;
    const products=await product.findById(prdid); 
    res.render('./products/edit',{products});
})

router.get('/doctors/:prdid',async(req,res)=>{
    const {prdid}=req.params;
    const products=await product.findById(prdid);
    await products.populate('reviews'); 
    await products.populate('creator');
    res.render('./products/show',{products});
})

router.patch('/doctors/:prdid',isLoggedIn,async(req,res)=>{
    const {prdid}=req.params;
    const {name,img,price,desc}=req.body;
    await product.findByIdAndUpdate(prdid,{name,img,price,desc});
    console.log("Doctor updated");
    req.flash('message','updated successfully');
    res.redirect('/doctors/'+prdid);
})
  
router.delete('/doctors/:prdid',isLoggedIn,async(req,res)=>{
    const {prdid}=req.params;
    await product.findByIdAndDelete(prdid);
    console.log('Doctor deleted');
    res.redirect('/doctors');
}) 


router.get('/doctors/type/:t',async(req,res)=>
{
    const {t}=req.params;
    const products=await product.find({price:t});
    res.render('./products/product',{products});
})
module.exports=router;