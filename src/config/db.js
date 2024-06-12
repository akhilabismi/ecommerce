const mongoose = require("mongoose")

const  mondbUrl="mongodb+srv://akhilabismi:group5@cluster0.zynx108.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb=()=>{
    return mongoose.connect(mondbUrl);
}

module.exports={connectDb}