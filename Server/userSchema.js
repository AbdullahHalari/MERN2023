const mongooose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const userSchema = new mongooose.Schema({
  fullName: {
    type: String,
   required: true,
  },
  email: {
    type: String,
   required: true,
  },
  phoneNumber: {
    type: Number,
   required: true,
  },
  registrationId: {
    type: String,
   required: true,
  },
  selectedProgram: {
    type: String,
   required: true,
  },
  specialty: {
    type: String,
   required: true,
  },
  password: {
    type: String,
   required: true,
  },
  retypePassword: {
    type: String,
   required: true,
  },
  tokens:[
    {
      token:{
        type:String,
        required:true
      }
    }
  ]
});
userSchema.pre('save',async function (next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,12);
    this.retypePassword = await bcrypt.hash(this.retypePassword, 12);
  }
  next();
});
userSchema.methods.generateAuthToken = async function (){
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:token});
    await this.save();
    console.log('save')
    return token 
  } catch (error) {
    console.log(error)
  }
}
const User = mongooose.model("users", userSchema);

module.exports = User;
