const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {secret} = require('../config/jwt.config');

const Register = async (req, res) => {
    try{
        const oldUser = await User.findOne({ email: req.body.email})
         console.log(oldUser);
            if (oldUser) {
              res.json({errors: true, message: "El correo electrónico se encuentra registrado"})
              } else {
                const user = await User.create(req.body);
                res
                .json({ email: user.email, _id: user._id}); 
            }

      
    }
    catch (err) {
        console.log(err);
        res
        .json(err);
      }
};

const Login = async (req, res) => {
  try{
    const user = await User.findOne({email: req.body.email});

    if (user === null) {
      res.json({errors:true, message:'El usuario no existe'});
    }

    const correctPassword = await bcrypt.compare(req.body.password,user.password);
    const logUser={
      _id: user._id,
      firstName: user.firstName,
      email: user.email
    };

    if (!correctPassword) {
      res.json({errors: true, message:'La contraseña no es correcta'});
    };
    const userToken = jwt.sign(logUser, secret);
    res
      .cookie("userToken", userToken, secret,{httpOnly: true})
      .json({mensaje: "success"});
   
  } 
  
  catch(err){
    res.json(err);
  }
 
}; 
        
const getAll=(request,response)=>{
    User.find({})
    .then(users=>response.json(users))
    .catch(err=>response.json(err))
  }

  module.exports= { Register, Login, getAll}

