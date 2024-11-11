const { get } = require('mongoose');
const LoginUser = require('../models/login.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminUsers = require('../adminUsers/adminusers');
require("dotenv").config();


const guardarTextarea = async (req, res) => {
    try {
        const { nickName, email, password } = req.body;
        if (!nickName || !email || !password) {
            res.send({
                success: false,
                msg: "Please fill the field"
            })
        } else {
            const is_email = await LoginUser.findOne({ email: email });
            if (is_email) {
                res.send({
                    error: true,
                    msg: "Email already exist"
                })
            } else {
                // const adminUsers1 = adminUsers.adminusers
                console.log('adminUsers',adminUsers);
                // console.log('adminUsers1',adminUsers1);
                let isAdmin = false
                adminUsers.forEach(emails =>{
                    console.log('emails',emails);
                    isAdmin = emails.andminEmail === email ? true : false;
                    console.log('isAdmin', isAdmin);
                });

                console.log('isAdmin1', isAdmin);
                const hashPassword = await bcrypt.hash(password, 12)
                const users = new LoginUser({
                    nickName: nickName,
                    email: email,
                    password: hashPassword,
                    passwordWithEcrip: password,
                    isAdmin: isAdmin
                    
                });
                const result = await users.save();
                if (result) {
                    res.send({
                        success: true,
                        msg: "User Create successfully"
                    })
                } else {
                    res.send({
                        success: false,
                        msg: "Server Problem"
                    })
                }
            }

        }
    } catch (error) {
        res.send("error " + error.message);
    }
};




const obtenerTextarea = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { payload } = jwt.verify(token, process.env.SECRET_KEY);
        const users = await LoginUser.findById({ _id: payload.user_id });
        res.send({ users }).status(200);
    } catch (error) {
        res.status(401).send("unAuthorized");
    }
};


module.exports = {
    guardarTextarea,
    obtenerTextarea
};