const express = require('express')  // commonjs
const mongoose = require('mongoose');
const config = require('./config').config;
const path = require('path')
const app = express();

// Connect DataBase
mongoose.connect(config.mongoURI, {user: config.mongoUser, pass: String(config.mongoPass)},  { useUnifiedTopology: true }).then(
    () => {console.log('Mongo DB connected');},
    err => { console.error(err.message); }
  );

// init middleware
app.use(express.json({extended:false}));

// Define Routes
app.use('/api/users',require('./routes/users'))
app.use('/api/contacts',require('./routes/contacts'))
app.use('/api/auth',require('./routes/auth'))

//Serve static assets in production
if(process.eventNames.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))