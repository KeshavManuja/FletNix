const { getUserModel } = require("../models/user_model");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const ERROR_MESSAGES = require("../constants/error_constants")

const SignupController = {
    signup: async ( req , res) => {
        try {

            const name = req.body.name;
            const email = req.body.email;
            const age = req.body.age;
            const password = req.body.password;
            let payload = {
                name,
                email,
                age,
                password
            }
            //Check if email already exists
            const UserModel = await getUserModel();
            const isEmailAlreadyExist = await UserModel.findOne({email: email});
            // console.log(isEmailAlreadyExist)
            if(isEmailAlreadyExist) {
                throw new Error(ERROR_MESSAGES.ALREADY_REGISTERED)
            }
    
            // Hash the password
            let passHash = await bcrypt.hash(password, 5);
            payload = {...payload,password:passHash};

            // give token ->>>
            const token = jwt.sign(payload, process.env.JSON_SECRET);
            // Store info
            const isInserted = await UserModel.insertOne(payload);
            if(!isInserted.acknowledged) {
                throw new Error(ERROR_MESSAGES.SOMETHING_WENT_WRONG)
            }
            //return
            return res.status(201).json({
                message:"User Registeration successfull!",
                token
            })

        } catch(error) {
            // console.log(error);
            return res.status(504).json({
                message: error.message
            })
        }
    }
}

module.exports = SignupController