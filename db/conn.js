const mongoose = require('mongoose')
const DB = process.env.DATABASE;

mongoose.set('strictQuery', false);
mongoose.connect(DB).then(() => {
    console.log("Databse Connected")
}).catch((err) => {
    console.log(err);
});