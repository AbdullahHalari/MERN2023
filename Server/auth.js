const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const authenticate = require('./authenticate')
require("./dbcon")
const User = require("./userSchema")
router.get("/", (req, res) => {
  res.send(`Hello world from the server router js`);
});
//using promises
// router.post("/register", (req, res) => {
//   const {name,email,phone,work,password,cpassword} = req.body
//   if(!name || !email || !phone || !work || !password || !cpassword)
//   {
//     return res.status(422)
//   }
//   User.findOne({email:email})
//   .then((userExist)=>{
//     if (userExist) {
//       return res.status(422).json({ error: "Email already Exist" });
//     }
//     const user = new User({name:name,email:email,password:password}); //req.body bhi use hosakta hai jab sara data bhejna ho 
//     user.save().then(()=>{
//       res.status(201).json({message:'successfully stored'})
//     }).catch((err)=>res.status(500).json({error:'failed'}))
//   }).catch((err)=>{console.log(err)})
  
//   // console.log(req.body);
//   // res.json({ message: req.body });
//   // res.send("mera register page");
// });
router.post("/register", async (req, res) => {
  const {
    fullName,
    registrationId,
    phoneNumber,
    email,
    password,
    retypePassword,
    selectedProgram,
    specialty,
  } = req.body;
  if (  !fullName||
        !registrationId||
        !phoneNumber||
        !email||
        !password||
        !retypePassword||
        !selectedProgram||
        !specialty) {
    return res.status(422);
  }
  try {
   const userExist = await  User.findOne({ email: email })
        if (userExist) {
          return res.status(422).json({ error: "Email already Exist" });
        }
        const user = new User({
          fullName:fullName,
          registrationId:registrationId,
          phoneNumber:phoneNumber,
          email:email,
          password:password,
          retypePassword:retypePassword,
          selectedProgram:selectedProgram,
          specialty:specialty,
        }); //req.body bhi use hosakta hai jab sara data bhejna ho
        const userReg = await user.save()
          if(userReg){

            res.status(201).json({ message: "successfully stored" });
            console.log(userReg)
          }
          else{
            res.status(500).json({ error: "failed" })
          }
      

  } catch (err){

    console.log(err);
  }
});

router.post('/signin',async (req,res)=>{
  console.log(req.body);
  try {
    const {email,password} = req.body;
    if(!email || !password){
      return  res.status(400).json({error:'empty fields'})
    }
    const userLogin = await User.findOne({email:email});
    if (userLogin) {
      const isMatch = await bcrypt.compare(password,userLogin.password);
       token = await userLogin.generateAuthToken()
      console.log("token is "+token)
      res.cookie("jwtoken",token,{
        expires: new Date(Date.now()+251346464),
        httpOnly:true
      });
    if (!isMatch) {
     res.status(400).json({error:'user error'})
      
    } else {
      res.json({ response: "Success" });
    }}
    else{
       res.status(400).json({ error: "user error" });
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/about',authenticate,(req,res)=>{
  console.log('hello about');
  res.send('hello about world from server')
})
module.exports = router;
