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

router.put(
  "/:id",
  async (req, res) => {
      try {
          const user = await User.findOneAndUpdate(req.params.id,
              {
                  $set:{
                      name: req.body.userName
                  }
              });
          console.log(user);
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