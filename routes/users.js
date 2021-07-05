const express = require('express');
const router = express.Router();
const config = require('config')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/Users');

// @route POST api/users
// @desc Register a user
// @access Public

router.post('/',[
    body('name','Please add a name').not().isEmpty(),
    body('email','Please enter a valid email').isEmail(),
    body('password','Please enter a password with 6 or more characters').isLength({min:6})
],async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    // res.send('passed')

    const {name,email,password} = req.body;

    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:'User already exsist'});
        }

        user = new User({
            name,
            email,
            password
        })
        // Encrypting password using bcrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save()
        // res.send('user saved')
        const payload = {
            user:{
                id : user.id
            }
        }
        jwt.sign(payload,config.get('jwtsecret'),{
            expiresIn:36000000
        },(err,token)=>{
            if(err) throw err;
            res.json({token})
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

module.exports = router;