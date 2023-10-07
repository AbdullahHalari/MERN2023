const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
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
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422);
  }
  try {
   const userExist = await  User.findOne({ email: email })
        if (userExist) {
          return res.status(422).json({ error: "Email already Exist" });
        }
        const user = new User({ name: name, email: email, password: password }); //req.body bhi use hosakta hai jab sara data bhejna ho
        const userReg = await user.save()
          if(userReg){

            res.status(201).json({ message: "successfully stored" });
          }
          else{
            res.status(500).json({ error: "failed" })
          }
      

  } catch (err){

    console.log(err);
  }
});
router.post('/signin',async (req,res)=>{
  console.log(res.body);
  try {
    const {email,password} = req.body;
    if(!email || !password){
      return  res.status(400).json({error:'empty fields'})
    }
    const userLogin = await User.findOne({email:email});
    if (userLogin) {
      const isMatch = await bcrypt.compare(password,userLogin.password);
      const token = await userLogin.generateAuthToken()
      console.log(token)
      res.cookie("jwtoekn",token,{
        expires: new Date(Date.now()+251346464),
        httpOnly:true
      });
    if (!isMatch) {
      res.json({error:'user error'})
      
    } else {
      res.json({ error: "Success" });
    }}
    else{
       res.json({ error: "user error" });
    }
  } catch (error) {
    console.log(error)
  }
})


module.exports = router;
