const express=require('express');
const app=express();
const path=require("path");


//using midelwares

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

// override 
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
// data ko parse ke liye matlab enode ke liye
app.use(express.urlencoded({extended:true}));

const { faker } = require('@faker-js/faker');
let mysql=require("mysql2");


const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  database:'new',
  password:'amit@123',
});

let getRandomUser =()=> {
  return [
     faker.string.uuid(),
  faker.internet.userName(),
     faker.internet.email(),
     faker.internet.password(),
   
];
 
};

// home route
app.get("/",(req,res)=>{
  let q="select count(*) from user";
  try{
  connection.query(q,(err,result)=>{
    if(err) throw err;
    let count=result[0]["count(*)"];
    res.render("home.ejs",{count});
  });
}catch(err){
  console.log(err);
  res.send("something went wrong");
}
  
})

// show route

app.get("/show",(req,res)=>{
  let q="select id,email,username from user";
  try{
  connection.query(q,(err,result)=>{
    if(err) throw err;
    let {username,id,email}=result;
    res.render("show.ejs",{result});
  });
}catch(err){
  console.log(err);
  res.send("something went wrong");

  
}});

// edit route

app.get("/user/:id/edit",(req,res)=>{
  let {id}=req.params;
  let q=`select * from user where id="${id}"`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let user=result[0];
      res.render("edit.ejs",{user});
    }
   
 ) }catch(err){
    console.log("something went wrong");
  };
  
});

// delete
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    res.send("some error with DB");
  }
});

app.delete("/user/:id/", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (user.password != password) {
        res.send("WRONG Password entered!");
      } else {
        let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
        connection.query(q2, (err, result) => {
          if (err) throw err;
          else {
            console.log(result);
            console.log("deleted!");
            res.redirect("/show");
          }
        });
      }
    });
  } catch (err) {
    res.send("some error with DB");
  }
});
// update route

app.patch("/user/:id",(req,res)=>{
  let {id}=req.params;
  let {password:formPass,username:newuserName}=req.body;
  console.log(req.body);
  let q=`select * from user where id="${id}"`;

try{
  connection.query(q,(err,result)=>{
    if(err) throw err;
    let user=result[0];
    if(formPass!=user.password){
      res.send("wrong password");
    }else{
  let q2=`update user set username="${newuserName}"where id="${id}"`;
  connection.query(q2,(err,res)=>{
     if(err) throw err;
     
  });
  res.redirect("/show");
  
    
  }});
}catch(err){
  res.send("error");
}
});

app.listen(8000,(req,res)=>{
  console.log("server start");
  
})


