// const customerCtrl = require('../controllers/customer.controller');
const usersctrl = require('../controllers/users.controller');
const loginctrl = require('../controllers/login.controller.js');
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
    }

] 


module.exports = routes;