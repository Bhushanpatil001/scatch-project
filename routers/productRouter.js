const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config')
const productModel = require('../models/product-model')

router.post("/create", upload.single("image") ,async (req,res) => {
    try{
        let {name , price, bgcolor, panelcolor, textcolor, discount} = req.body;
    
        let product = await productModel.create({
            image : req.file.buffer,
            name, 
            price,
            bgcolor,
            panelcolor,
            textcolor,
            discount
        });

        req.flash("success", "Product created Successfully");
        res.redirect("/owners/admin");
    }catch(err){
        res.send(err.message)
    }
})


module.exports = router;