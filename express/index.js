const express = require('express'); // require express from his package

// express function ko execute kara kar hum ise app naam ke variable m store karate hai

const app=express();

// console.log(app);

//port making first=port are endpoints of a nnetwork that is ued to excahnge info b/w web server and clinet serveer

//let make a port

let port=3000;

// now express listen the incoming request firts ,listining request is one w=ofnthe work of a express js
// 1st listen request

//listen is a specific method yeh ek web server banata hai jo incoming api request ke liye listrn karta hai 

app.listen(port,()=>{
  console.log(`app is listining port ${port}`);
});

// server ek baar strat hone ke baad hume hi use band karna padthha hai

// srver humara hume cannot get/ dikha raha hai ,matlab server chal rha hai but usk paas abhi koi get request nhi hai


   //** request bhejna **/

   //express khud hi 2 call back request and response create karta h 

  //  app.use((req,res)=>{
  
  //         console.log("request recived");
  //         //send type is content-type=json
  //         res.send({
  //           name:"amit",
  //           age:18,
  //         });
  //  })


  //** good way to send response **/
  
// diffrent routes
  // default root path
  app.get("/",(req,res)=>{
    res.send("you contacted root path");
  })

  // redirect to home path
  app.get("/home",(req,res)=>{
    res.send("you contacted root home path");
  })

  //search path redirect
  app.get("/search",(req,res)=>{
    res.send("you contacted root search path");
  })

   // username define karna in root m

   app.get("/:username/:id",(req,res)=>{
    // console.log(req.params);
    // res.send("hello, i am amit ");

    // print karana username and id ko
    // username jaise extra cheeze rq ke paramiters m aati hai

    let  { username , id }=req.params;
    res.send(`welcome to @${username} and your id is ${id}`);
})


// query string

app.get("/query",(req,res)=>{
  let {q}=req.query;
  if(!q){
    res.send("<h1>nothing search</h1>")
  }
  res.send(q);
})

  // * likhne par kuch bhi bhej skte hai
 //jab kuch bhi route match n ho
   app.get("*",(req,res)=>{
    res.send(" path does not exist");
  })


 



