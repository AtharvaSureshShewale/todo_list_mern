const express=require('express');
const router=express.Router();
const { CreateUser, LoginUser } = require('../controller/UserController');
const {body}=require('express-validator');


router.post('/createuser',
    body('email').isEmail(),
    body('password','Length of the password should be min 5').isLength({min:5}),
    CreateUser
);

router.post('/login',
    body('email').isEmail(),
    body('password','Length of the password should be min 5').isLength({min:5}),
    LoginUser
);
module.exports=router;