const mongoose = require('mongoose');

mongoose
.connect('mongodb://localhost/singlesplans')
.then(() => console.log('mongodb connected.....'))
.catch((err) => console.log('error'));