const express= require("express");
const app= express();


const userModel=require("./models/userModel");
const path = require("path");
const bcrypt=require("bcrypt");
const jwt= require("jsonwebtoken");


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join("__dirname", "public")));


app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/create",(req,res)=>{
    let { name, password, age, email }=req.body;
    let user;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt,async function(err, hash) {
           createdUser=await userModel.create({
            name,
            email,
            age,
            password:hash
           })

           let token =jwt.sign({email},"arpit");
           res.cookie("token",token);
           res.send(createdUser);
        });
    });
    
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",async (req,res)=>{
   let {email,password} = req.body;
   let user= await userModel.findOne({email})
   if(!user) return res.send("Something went wrong");

   bcrypt.compare(password, user.password,  function(err, result) {
    if(result){
        res.send("login successful");
        let token =jwt.sign({email},"arpit");
        res.cookie("token",token);
    }
    else return res.send("Something went wrong");
});
})

app.get("/logOut", (req,res)=>{
    res.cookie("token","");

})

app.listen(3000);