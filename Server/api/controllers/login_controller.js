const { getUserModel } = require("../models/user_model")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const ERROR_MESSAGES = require("../constants/error_constants")
const LoginController = {
    login: async ( req , res) => {
        try {
            // find user with email
            const UserModel = await getUserModel();
            const isValidUser = await UserModel.findOne({email:req.body.email});
            
            if(!isValidUser) {
                throw  new Error(ERROR_MESSAGES.NOT_EXIST)
            }
            const password = req.body.password;
            // then check pass hash check
            // console.log(bcrypt)
            console.log(password, isValidUser)
            const checkPass = await bcrypt.compareSync(password, isValidUser.password);
            if(!checkPass) throw new Error(ERROR_MESSAGES.WRONG_PASSWORD);
            
            
            // if matched create a token
            const token = jwt.sign(isValidUser, process.env.JSON_SECRET);
            console.log({token},"Login")
            return res.status(201).json({
                message:"User Login successfull!",
                token
            })
            
        } catch (error) {
            return res.status(504).json({
                message: error.message
            })
        }
    }
}

module.exports = LoginController