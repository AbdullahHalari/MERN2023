const mongooose = require("mongoose");
const bcrypt = require("bcryptjs")
const userSchema = new mongooose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens:[
    {
      token:{
        type:STring,
        required:true
      }
    }
  ]
});
userSchema.pre('save',async function (next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});
userSchema.method.generateAuthToken = async function (){
  try {
    let mytoken  = jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:mytoken});
    await this.save();
    return mytoken 
  } catch (error) {
    console.log(error)
  }
}
const User = mongooose.model("Users", userSchema);

module.exports = User;
