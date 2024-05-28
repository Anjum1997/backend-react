const express = require('express');  
const app = express(); 
const port = process.env.PORT || 5000 
const bodyParser = require('body-parser');
const users = require("./test/MOCK_DATA.json");


app.use(bodyParser.json());
// 
// app.use(express.json());  

// const path = require("path") 
// const hbs = require ("hbs") // foe using partials

// console .log( path.join(__dirname,'./public'));
//  const staticPath = path.join(__dirname,'./public');
// const partialsPath = path.join(__dirname,'./views/partials');
// to set view engine
//  app.set("view engine", "hbs")
//  hbs.registerPartials( partialsPath);
//  app.use(express.static(staticPath));

//template engine route 
// app.get('/', (req, res)=>{ 
//     res.render("index");  
// }); 

 // if we want to some changes on content using hbs 
//  app.get('/', (req, res)=>{ 
//     res.render("index"),{
//         channelName:"anjum"
//     };  
// }); 
//in html or index.hbs  in between tags
//  <>{{ channelName}}</>
//  

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Get a single user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Create a new user
app.post('/users', (req, res) => {
    const newUser = {
        id: currentId++,
        ...req.body
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update a user by ID
app.put('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id == req.params.id);
    if (index !== -1) {
        users[index] = { id: parseInt(req.params.id), ...req.body };
        res.json(users[index]);
    } else {
        res.status(404).send('User not found');
    }
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id == req.params.id);
    if (index !== -1) {
        users.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('User not found');
    }
});


 
 app.get('/', (req, res)=>{ 
    res.status(200).send("Welcome to the world of Anjum Mishra");  
}); 


app.get('/about', (req, res)=>{ 
    res.set('Content-Type', 'text/html'); 
    res.status(200).send("<h1>Hello Anjum Mishra!</h1>"); 
}); 
app.post('/', (req, res)=>{ 
    const requestData = req.body; 
    console.log('Received data:', requestData); 
    res.status(200).send(`${requestData .name}`); 

    // const {name} = req.body; 
    // res.send(`Welcome  to world of ${name}`); 
}) 
  

app.get('/temp', (req, res)=>{ 
    res.status(200).send({
        id:1,
        name:"anjum mishra"
    });
   
}); 
app.get('*', (req, res)=>{ 
    res.status(404).send(" <h1>the page you are looking for is not found </h1>");
   
}); 

app.listen(port, (error) =>{ 
    if(!error) 
        console.log(`Server running at http://localhost:${port}`) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
);



//mkdir public
//cd  public
//type null > index.html
// 
// multer // file upload
// cors
// mongodb
