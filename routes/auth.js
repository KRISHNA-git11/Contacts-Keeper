const express = require('express')
const router = express.Router();
const User = require('../models/Users');
const config = require('../config')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const { body, validationResult } = require('express-validator');

// @route GET api/auth
// @desc Get logged in user
// @access Private

router.get('/',auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.send(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
})

// @route POST api/auth
// @desc Auth user & get logged in
// @access Public

router.post('/',[
    body('email','Please enter a valid email').isEmail(),
    body('password','Please enter the correct password').exists()
],async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:'Please enter valid credentials'})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:'Please enter valid credentials'})
        }

        const payload = {
            user:{
                id : user.id
            }
        }
        jwt.sign(payload, toString(config.jwtsecret),{
            expiresIn:36000000
        },(err,token)=>{
            if(err) throw err;
            res.json({token})
        })

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
})

module.exports = router;