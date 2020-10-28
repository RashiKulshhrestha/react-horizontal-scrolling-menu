const express = require("express");
const router = express.Router();
const { check,validationResult } = require('express-validator');
var moment = require("moment");
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
            pic,
            date
        } = req.body;

        user = new User({
            name,
            email,
            mobile,
            description,
            pic,
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

router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  router.get("/:id",
async (req, res) => {
    try{
        const params_id = req.params.id;
        const user = await User.find({_id: params_id});
        res.json(user);
        console.log(params_id );
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

var utcDate = moment().format("MMMM Do YYYY");
var utcTime = moment().format("h:mm a");
var step1utc = moment().add(3, 'days').format("MMMM Do YYYY");
var step2utc = moment().add(6, 'days').format("MMMM Do YYYY");
var step3utc = moment().add(9, 'days').format("MMMM Do YYYY");
router.put(
  "/:id",
  async (req, res) => {
      console.log(utcTime);
      try {
          const user = await User.findByIdAndUpdate(req.params.id,
              {
                  $set:{
                      name: req.body.userName,
                      email: req.body.email,
                      description: req.body.desc,
                      mobile: req.body.phone,
                      date: utcDate,
                      time : utcTime,
                      step1 : step1utc,
                      step2 : step2utc,
                      step3 : step3utc
                  }
              });
          await user.save();
          res.send(user);
      }
      catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
      }
  }
);
  
module.exports = router;