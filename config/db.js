const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async() => {

    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useCreateIndex : true,
            useFindAndModify:false,
            useUnifiedTopology: true
    })

    console.log('Mongo DB connected')
        
    } catch (err) {
        console.error(err.message);
        process.exit(w)
    }

    // mongoose.connect(db,{
    //         useNewUrlParser: true,
    //         useCreateIndex : true,
    //         useFindAndModify:false,
    //         useUnifiedTopology: true
    // })
    //     .then(()=>console.log('MongoDB connected'))
    //     .catch(err=>{
    //             console.error(err.message);
    //             process.exit(w)
    //                     })
}

module.exports = connectDB;