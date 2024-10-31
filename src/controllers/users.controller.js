const { get } = require('mongoose');
const User = require('../models/users.model')
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        if (!newUser.idLogin || !newUser.loginUser.nickName || !newUser.loginUser.email ) {
        res.send({
            success: false,
            msg: "Please fill the field"
        })
        } else {
            const result = await newUser.save();
            if (result) {
                res.send({
                    success: true,
                    msg: "Customer create successfully"
                })
            } else {
                res.send({
                    success: false,
                    msg: "Some problem"
                })
            }
            
        }
    } catch (error) {
        res.send("error " + error.message);
    }


 

}

const getUsers = async (req, res) => {
    console.log('IIIII')
    // const token = req.headers.authorization.split(" ")[1];
    
    try {
        // if (token) {
            const users = await User.find();
            res.send(users)
        // } else {
        //     res.send("unAuthorized User")
        // }
    } catch (error) {
        res.send("error " + error.message);
    }
};



const getUser = async (req, reply) => {
    const user = await User.findById(req.params.id);
    reply.code(201).send(user);
};



const updateUser = async (req, res) => {  
    console.log('UUUUU') 
    try {
        console.log('LLLLL') 
        const id = req.params.id;
        const { idLogin, loginUser: {nickName, email}, personalData:{image, name, secondName, birthDate, gender, phone}, accountData:{titularCard, IBAN, code, caducyDate} } = req.body;
            const user = await User.findByIdAndUpdate({ _id: id }, {
                idLogin,
                loginUser:{nickName, email},
                personalData: {image, name, secondName, birthDate, gender, phone},
                accountData: {titularCard, IBAN, code, caducyDate}
            });

            console.log('SSSSSSS', user) 

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
        
    } catch (error) {
        res.send("error " + error.message)
    }   
};

// const updatePasswordUser = async (req, res) => {  
//     try {
//         const id = req.params.id;
//         console.log('LLLLL', id)
//         const { password1 } = req.body;
//         console.log('UUUUUU', password1)
//         if ( !password1 ) {
//             res.send({
//                 success: false,
//                 msg: "Please fill the field"
//             })
//         } else {
//             password = await bcrypt.hash(password1, 12)
//             console.log('password', password)
           
//             const user = await User.findByIdAndUpdate({ _id: id }, {
//                 loginUser:{password}
//             }); 

//             if (user) {
//                 res.send({
//                     success: true,
//                     msg: "Customer Update successfully"
//                 })
//             } else {
//                 res.send({
//                     success: false,
//                     msg: "Please fill the field"
//                 })
//             }
            
//         }
//     } catch (error) {
//         res.send("error " + error.message)
//     }   
// };

const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.code(204).send();
    
};



module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
   
};