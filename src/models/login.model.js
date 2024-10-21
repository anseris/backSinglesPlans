const { Schema, model } = require('mongoose');

const registerSchema = new Schema(
    {
        nickName: String,
        email: String,
        password: String
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = model('LoginUser', registerSchema);