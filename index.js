 
const http = require('http');
 const fs = require("fs");
 const dotenv = require("dotenv").config();
 const path = require ("path")
 const os = require('os');
  
 


 const data = {
  name:'anjum mishra',
email:"anjummishra1997@gmail.com",
gender:'male',
age:"26",
 };

 const jsonData =JSON.stringify(data);
 console.log(jsonData);
 const obData = JSON.parse(jsonData);
 console.log(obData);



 console.log(path.dirname('D:\React\Node-backend\index.js'));
 console.log(path.basename('D:\React\Node-backend\index.js'));
 console.log(path.extname('D:\React\Node-backend\index.js'));
 
 console.log(path.parse('D:\React\Node-backend\index.js'));
 
 const myPath = path.parse('D:\React\Node-backend\index.js');
 
 console.log(myPath.name);
 
 
 // return the cpu architecture
 console.log("CPU architecture: " + os.arch());
  
 // It returns the amount of free system memory in bytes
 console.log("Free memory: " + os.freemem());
  
 // It return total amount of system memory in bytes
console.log("Total memory: " + os.totalmem());
 
// It returns the list of network interfaces
console.log('List of network Interfaces: ' + os.networkInterfaces());
 
// It returns the operating systems default directory for temp files.
console.log('OS default directory for temp files : ' + os.tmpdir());  
 
 
  fs.mkdir(path.join(__dirname, 'app'),
      (err) => {
          if (err) {
              return console.error(err);
          }
          console.log('Directory created successfully!');
      });
 
       
   
 fs.rmdir("app", () => { 
  console.log("Folder Deleted!"); 
});
 
     fs.mkdir(path.join(__dirname, 'test'),
     { recursive: true },
     (err) => {
         if (err) {
             return console.error(err);
         }
         console.log('Directory created successfully!');
     });

    

fs.writeFileSync("server.txt","welcome to my space anjum mishra \n ");
 
  
  fs.writeFileSync("server.txt","welcome to my space anjum mishra , go to kneel in front of god \n");
 
  fs.appendFileSync("server.txt" ,' how are you  gor to channel for subscribing and entertaining you in future');
  
 
    const buf_data = fs.readFileSync("server.txt");
 // console.log(buf_data);
    org_data = buf_data.toString();
    console.log(org_data);
  
    //rename before and after
  getCurrentFilenames(); 
    
  // Rename the file 
  fs.renameSync('server.txt', 'world.txt'); 
    
  // List all the filenames after renaming 
  getCurrentFilenames(); 
    
  // function to get current filenames in directory 
  function getCurrentFilenames() { 
    console.log("Current filenames:"); 
    fs.readdirSync(__dirname).forEach(file => { 
      console.log(file); 
    }); 
  } 
 
  

const server = http.createServer((req, res) => { 
   res.writeHead(200, { 'Content-Type': 'text/html'});
  // res.write('<h1> Anjum Mishra is a villain so be aware  of what you in front of him</h1>');
  // res.end();
  if (req.url ==="/"){
    res.end("welcome to the anjum mishra website");
  }
  else if(req.url ==="/contact"){
    res.end("welcome to the contact page");
  }
  else if(req.url ==="/product"){
    res.end("welcome to the product page");
  }
  else if(req.url ==="/login"){
    res.end("welcome to the login page");
  }
  else if(req.url ==="/signup"){
    res.end("welcome to the signup page");
  }
  else if(req.url ==="/userapi"){
    fs.readFile(`${__dirname}/test/userapi.json`,"utf-8",(err,data) =>{
      const orgData =JSON.parse(data);
   console.log(orgData); 
    res.end(data);
    }
)}
else {
  res.end("404 , the page you are looking for is not found")
}
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});




// mongodb password:
  //kRLFwiVKOcQx8NPR



  // if (pathname === '/') {
  //   serveFile(path.join(__dirname, 'public', 'index.html'), 'text/html', res);
  // } else if (pathname === '/about') {
  //   serveFile(path.join(__dirname, 'public', 'about.html'), 'text/html', res);
  // } else if (pathname === '/sysinfo') {
  //   res.writeHead(200, { 'Content-Type': 'application/json' });