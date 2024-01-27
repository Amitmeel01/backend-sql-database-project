const express=require("express");
const app=express();

// view directory ko lookup view ke liye 
const path=require("path");

const port=8080;

// ejs use

app.set("view engine","ejs");

// views naam ka folder hume path.join par  milega 
// jisme __dirname  current directory hai jo ki is time backend/ejs hai.
// views ek folder hai
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
  res.render("home.ejs");
})

// instagram activity

app.get("/ig/:username",(req,res)=>{
const followers=["adam","amit","ankit","ajay","sunil"];

  let {username}=req.params;  // jo mene request bheji h usme kya parametir mene pass kiya h bs use hi get krne ke liye hum req.params llikhte h

  // res.send(req.params);  // ise hume username kinhi value milti hai

  // res.send(username)  // isme bhi hume name get hoga jo humdenge
  const instagramdata=require("./data.json");
  // console.log(instagramdata);
   const data=instagramdata[username];
   console.log(data);
  res.render("instagram.ejs",{username,followers,data});



})
app.listen(port,()=>{
  console.log(`server started and port it ${port}`);
});

app.get("/",(req,res)=>{
  res.send("hello");

})

// roll dice function use

app.get("/rolldice",(req,res)=>{
  let diceval=Math.floor(Math.random()*6+1);
  res.render("rolldice.ejs",{diceval});
})