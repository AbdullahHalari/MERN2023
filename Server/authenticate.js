const jwt = require("jsonwebtoken");
const User = require("./userSchema");

const authenticate = async (req,res,next)=>{
    try {
        
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY)
        const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token})
        if(!rootUser){
            console.log('user not found')
            throw new Error('User not found')
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID= rootUser._id;
        next();
    } catch (error) {
         res.status(400).json({ error: "unauth no token" });
        res.status(401).json({ error: "unauth no token" });
        console.log(error)
    }
}
module.exports = authenticate;
