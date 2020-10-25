const express = require("express");
const router = express.Router();
const { check,validationResult } = require('express-validator');
const User = require("./userModel");

router.post("/",
[
    check("name","Name field is required.").not().isEmpty(),
    check("email", "Email field is required.").isEmail(),
    check("mobile", "Mobile Number is required.").isLength({ min:10 ,max:10 }),
    check("description", "Description is required").not().isEmpty(),
],
async (req,res)=> {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const {
            name,
            email,
            mobile,
            description,
            image,
            date
        } = req.body;

        user = new User({
            name,
            email,
            mobile,
            description,
            image,
            date
        });
        await user.save();
        res.json({ msg: "Data Added Successfully"})
    }
    catch(err){ 
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;