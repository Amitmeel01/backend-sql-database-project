const http=require('http');
const fs=require('fs');
const index=fs.readFileSync('index.html','utf8');
const data=fs.readFileSync('data.json','utf-8');
const server=http.createServer((req,res)=>{
console.log("started");
// console.log("hello world");
// res.end(<h1>hello</h1>);
console.log(req.url);

switch(req.url){
  case '/': res.writeHead(200,{'Content-Type':'application/json'});
  res.end(data);
  break;

  case '/api': res.writeHead(200,{'Content-Type':'text/html'});
  res.end(index);
  break;

  default: res.writeHead(404);
  res.end();
}

});
server.listen(8080);