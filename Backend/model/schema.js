const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  games: [
    {
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
      message: {
        type: String,
        required: true,
      },
    },
  ],
  totalScore : {
    type: Number,
    default: 0,
  }
  
});

// middleware to hash the password and confirm password.. if password is modified, hash it with 12 character hash.
userSchema.pre('save', async function (next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
})

// we are generating token 
userSchema.methods.generateAuthToken = async function(){
  try {
    let tokenNew = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:tokenNew});
    await this.save();
    return tokenNew;
  } catch (error) {
    console.log(error);
  }
}


const User = mongoose.model('USER', userSchema);
module.exports = User;