const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/Users');
const auth = require('../middleware/auth')
const Contact = require('../models/Contacts');

// @route GET api/contacts
// @desc Get all users contacts
// @access Private

router.get('/',auth,async(req,res)=>{
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date:-1});
        res.status(200).json(contacts);
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")
    }
    
})
// @route POST api/contacts
// @desc Add new contact
// @access Private

router.post('/',[auth,[
    body('name','Please enter a name').not().isEmpty()
]],async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {name, email, phone, type} = req.body
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user:req.user.id
        })
        const saved_contact = await newContact.save()
        const contact = await Contact.findById(saved_contact._id);
        res.status(200).json(contact);
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})
// @route PUT api/contacts
// @desc Update contact
// @access Private

router.put('/:id',auth,async(req,res)=>{
//Build contact objet
    const{name,email,phone,type} = req.body
    const contactFields = {}
    if(name) contactFields.name = name
    if(email) contactFields.email = email
    if(phone) contactFields.phone = phone
    if(type) contactFields.type = type

    try {
        let contact = await Contact.findById(req.params.id)
        if(!contact) return res.status(404).json({msg:'Contact not found'})
        // Make sure user owns the contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg:'Unauthorized access'})
        }
        contact = await Contact.findByIdAndUpdate(req.params.id,
            {$set: contactFields},{new:true})
        res.json(contact)
    } 
    catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})
// @route DELETE api/contacts
// @desc Delete contact
// @access Private

router.delete('/:id',auth,async (req,res)=>{
    try {

        let contact = await Contact.findById(req.params.id)
        if(!contact) return res.status(404).json({msg:'Contact not found'})
        // Make sure user owns the contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg:'Unauthorized access'})
        }
        await Contact.findByIdAndRemove(req.params.id)
        res.status(200).json({msg:'Bye bye contact'})
    } 
    catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }

})
module.exports = router;