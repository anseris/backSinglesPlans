const { get } = require('mongoose');
const LoginUser = require('../models/login.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const registerUser = async (req, res) => {
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
                const hashPassword = await bcrypt.hash(password, 12)
                const users = new LoginUser({
                    nickName: nickName,
                    email: email,
                    password: hashPassword,
                    passwordWithEcrip: password,
                    
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

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.send({
                success: false,
                msg: "Please fill the field"
            })
        } else {
            const users = await LoginUser.findOne({ email: email })
            if (users) {
                const hashPassword = await bcrypt.compare(password, users.password)
                if (hashPassword) {
                    const payload = { user_id: users._id };
                    const token = jwt.sign({ payload }, process.env.SECRET_KEY);
                    res.send({
                        success: true,
                        msg: "Login Successfully",
                        token: token
                    })
                } else {
                    res.send({
                        success: false,
                        msg: "InValid Email and password",
                    })
                }
            } else {
                res.send({
                    success: false,
                    msg: "InValid Email and password",
                })
            }
        }
    } catch (error) {
        res.send("error " + error.message);
    }
};

const getAndCheckUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { payload } = jwt.verify(token, process.env.SECRET_KEY);
        const users = await LoginUser.findById({ _id: payload.user_id });
        res.send({ users }).status(200);
    } catch (error) {
        res.status(401).send("unAuthorized");
    }
};

const recoverPassword = async (req, res) => {
    try {
        
        const { email } = req.body;
        if (!email) {
            res.send({
                success: false,
                msg: "Please fill the field"
            })
        } else {
            const user = await LoginUser.findOne({ email: email })
            if (user) {                
                res.send( user ).status(200);
            }
        }
    } catch (error) {
        res.send("error " + error.message);
    }
};
const updateLoginUser = async (req, res) => {  
    try {
        const id = req.params.id;
        const { nickName, email, password } = req.body;
        if (!nickName || !email || !password) {
            res.send({
                success: false,
                msg: "Please fill the field"
            })
        } else {
            const user = await LoginUser.findByIdAndUpdate({ _id: id }, {
                nickName, email, password
            }); 

            if (user) {
                res.send({
                    success: true,
                    msg: "Customer Update successfully"
                })
            } else {
                res.send({
                    success: false,
                    msg: "Please fill the field"
                })
            }
        }
    } catch (error) {
        res.send("error " + error.message)
    }   
};

const updatePasswordUser = async (req, res) => {  
    try {
        const id = req.params.id;
        console.log('LLLLL', id)
        const { passwordToChange } = req.body;
        console.log('UUUUUU', passwordToChange)
        if ( !passwordToChange ) {
            res.send({
                success: false,
                msg: "Please fill the field"
            })
        } else {
            password = await bcrypt.hash(passwordToChange, 12)
            const passwordWithEcrip = passwordToChange
            console.log('password', password)
           
            const user = await LoginUser.findByIdAndUpdate({ _id: id }, {
                password,
                passwordWithEcrip
            }); 

            if (user) {
                res.send({
                    success: true,
                    msg: "Customer Update successfully"
                })
            } else {
                res.send({
                    success: false,
                    msg: "Please fill the field"
                })
            }
            
        }
    } catch (error) {
        res.send("error " + error.message)
    }   
};

module.exports = {
    registerUser,
    loginUser,
    getAndCheckUser,
    updateLoginUser,
    recoverPassword,
    updatePasswordUser
};