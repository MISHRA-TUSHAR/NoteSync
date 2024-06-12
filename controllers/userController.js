const userModel = require('../models/userModel');
const bycript = require('bcrypt');
const jwt = require('jsonwebtoken');


const secretKey = 'secrectttt';


async function signUp (req,res){
    const {username,userMail,userPassword} = req.body;
    try{
        if(!username || !userMail || !userPassword){
            return res.status(400).json({
                message: "all feild are required"
            });
        }
        const existingUser = await userModel.findOne({email:userMail});


        if(existingUser){
            return res.status(400).json({
                message:"user already exists"
            });
        }
        const hashedPassword = await  bycript.hash(userPassword,10);

        const result = await userModel.create({
            username: username,
            email:userMail,
            password:hashedPassword
        });

        const token = jwt.sign({
            email: result.username,
            id: result._id
        },secretKey);
        return res.status(200).json({
            message:"successfully created account",
            token : token
        });
    }catch(e){
        return res.status(500).json({
            message:"internal server error",    
        });
    }
}


async function logIn(req,res){
    
    
    const {userMail,userPassword} = req.body;

    if(!userMail || !userPassword){
        return res.status(400).json({
            message: "all feild are required"
        });
    }
    try{
        const existingUser = await userModel.findOne({email:userMail});
        if(!existingUser){
            return res.status(400).json({
                message:"user dosen't exists"
            });
        }
        const matchPassword = await bycript.compare(userPassword,existingUser.password);
        if(!matchPassword){
            return res.status(400).json({
                message:"password dosen't matched"
            });
        }
        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        },secretKey);
        return res.status(400).json({
            message:"successfully logged in ",
            email: existingUser.email,
            token: token
        });
    }catch(e){
        return res.status(400).json({
            message:"internal server error",
        });
    }
}

module.exports = {
    signUp,
    logIn
}