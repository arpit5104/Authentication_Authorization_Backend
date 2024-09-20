const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/auth_app`);

const userSchema= mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    password:String
})

module.exports=mongoose.model("user",userSchema);