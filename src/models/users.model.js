const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        idLogin: String,
        loginUser: {
            nickName: String,
            email : String,
            password: String
        },
        personalData : {
            image: String,
            name : String,
            secondName: String,
            birthDate: String,
            gender: String,
            phone: String
        },
        accountData: {
            titularCard: String,
            IBAN: String,
            code: String,
            caducyDate: String,
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = model('User', userSchema);