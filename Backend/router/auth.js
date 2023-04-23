const express = require("express");
const jwt = require("jsonwebtoken");
// const { findOne } = require("../model/schema");
const bcrypt = require("bcrypt");
const router = express();
const validator = require("email-validator");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/schema");

router.get("/", authenticate, (req, res) => {
  res.send("hogya bhai hogya");
});



router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  // if user does not fill all the fields
  if (!name || !email  || !password || !cpassword) {
    return res.status(422).json({
      status: 422,
      error: "Please fill all the fields",
    });
  }
  const validEmail = validator.validate(email);
  if (!validEmail)
    return res.status(422).json({ status: 422, error: "Invalid Email Id" });
  if (password != cpassword)
    return res
      .status(422)
      .json({ status: 422, error: "Confirm Password does not match Password" });

  try {
    // if user is already registered
    const userExist = await User.findOne({
      email: email,
    });
    if (userExist) {
      return res.status(422).json({
        status: 422,
        error: "This email already exists",

      });
    }

    const user = new User({
      name,
      email,
      password,
    });

    // before saving we are running a middleware in schema.js to hash the password
    const resData = await user.save();

    res.status(201).json({
      status: 201,
      message: "User successfully registered",
      data : resData
    });
  } catch (error) {
    console.log("Error while registering user :-", error);
  }
});

// LOGIN MODEL
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(401)
        .json({ status: 401, error: "Please enter all the fields" });
    }

    const userLogin = await User.findOne({ email: email });
    if (!userLogin) {
      console.log("Invalid credentials")
      return res
        .status(401)
        .json({ status: 401, error: "Invalid credentials" });
    } else {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (isMatch) {
        token = await userLogin.generateAuthToken();
        console.log("tOKEN IS:- ", token);

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 2592000000),
          httpOnly: true,
        });
        res
          .status(200)
          .json({ status: 200, message: "Login successful", data: userLogin });
      } else {
        res.status(401).json({ status: 401, error: "Invalid credentials" });
      }
    }
  } catch (error) {
    console.log(error);
    console.error("error is");
  }
});

router.get("/about", authenticate, (req, res) => {
  res.send("hello from the server about");
});

//get user data for contact us and home page
router.get("/getdata", authenticate, (req, res)=>{
  res.send(req.rootUser);
})



//contact us page
router.post("/contact",authenticate, async(req, res)=>{
  try {
   
    const {name, email, phone, message} = req.body;

    if(!name || !email || !phone || !message){
      console.log("All fields in contact form not filled");
      return res.json({error: "Please fill all the fields"})
    }

    const userContact = await User.findOne({ _id: req.userID });

    if(userContact){
      const userMessage = await userContact.addMessage(name, email, phone, message);
      await userContact.save();
      res.status(201).json({message: "User contact saved successfully"})
    }

  } catch (error) {
    console.log(error)
  }
})



//Logout route
router.get("/logout", (req, res) => {
  res.clearCookie('jwtoken', {path: '/'});
  res.status(200).send("User logged out");
});

module.exports = router;
