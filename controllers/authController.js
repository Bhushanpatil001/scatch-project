const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generateToken } = require('../utils/generateToken')

module.exports.registerUser =async (req,res) => {
    try{
        let {fullname, email, password} = req.body
        let existingUser = await userModel.findOne({email: email});
        if(existingUser) return res.status(401).send("user already exist");

        bcrypt.genSalt(10 , function(err,salt){
            bcrypt.hash(password, salt,async function(err,hash){

                    let createdUser = await userModel.create({
                        fullname, email, password : hash
                    })  
                    
                    let token = generateToken(createdUser)
                    res.cookie("token", token);
                    res.send(createdUser)
            })
        })
    }
    catch(err){
        res.send(err.message);
    }
}

module.exports.loginUser = async (req,res) => {
  let {email , password} = req.body;
  let user = await userModel.findOne({email: email});
  if(!user) return res.status(401).send("Email or Password are incorrect")

  bcrypt.compare(password , user.password , function(err, result){
    if(!result)
    {
        return res.status(401).send("Email or Password are incorrect")
    }else{
        let token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop")
    }
    
  })
}

module.exports.logoutUser = (req,res) => {
    res.cookie("token", "");
    res.redirect("/");
}