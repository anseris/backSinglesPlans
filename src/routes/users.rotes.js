// const customerCtrl = require('../controllers/customer.controller');
const usersctrl = require('../controllers/users.controller');
const loginctrl = require('../controllers/login.controller.js');
const sendEmailctrl = require('../controllers/send-email.controller.js');
const tarjetasctrl = require('../controllers/tarjetas.controller.js');
const routes = [
    {
        url: '/users',
        method: 'GET',
        handler: usersctrl.getUsers,
    },
    {
        url: '/users/:id',
        method: 'GET',
        handler: usersctrl.getUser
    },
    {
        url: '/users/:id',
        method: 'DELETE',
        handler:  usersctrl.deleteUser
    },
    {
        url: '/users/:id',
        method: 'PUT',
        handler: usersctrl.updateUser
    }, 
    {
        url: '/users',
        method: 'POST',
        handler:  usersctrl.createUser
       
    },

    //RUTAS DE LOGIN
    {
        url: '/loginuser/register',
        method: 'POST',
        handler: loginctrl.registerUser
       
    },
    {
        url: '/loginuser/login',
        method: 'POST',
        handler: loginctrl.loginUser
    },
    {
        url: '/loginuser/getAndCheckUser',
        method: 'GET',
        handler: loginctrl.getAndCheckUser,
    },
    {
        url: '/loginuser/:id',
        method: 'PUT',
        handler: loginctrl.updateLoginUser,
    },
    {
        url: '/loginuser/updatePassword/:id',
        method: 'PUT',
        handler: loginctrl.updatePasswordUser,
    },
    {
        url: '/loginuser/recover',
        method: 'POST',
        handler: loginctrl.recoverPassword,
    },
    {
        url: '/send-email',
        method: 'POST',
        handler: sendEmailctrl.sendEmail,
    },
    //RUTAS DE LOGIN
    {
        url: '/guardar-textarea',
        method: 'POST',
        handler: tarjetasctrl.guardarTextarea,
    },
    {
        url: '/obtener-textarea',
        method: 'GET',
        handler: tarjetasctrl.obtenerTextarea,
    }



] 


module.exports = routes;