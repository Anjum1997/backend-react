const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const authRoute = require('./routes/authRoute');
const protectedRoute = require('./routes/protectedRoute');
const path = require("path");
const fs = require('fs');
const cookieParser = require('cookie-parser');
const i18n = require('./config/i18-config');
const generateExcelFromJSON = require('./utilis/exportToExcel');
const morgan = require('morgan');
const { successHandler, errorHandler } = require('./middlewares/responseHandler');

const router = express.Router();

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(i18n.init);

// Connect to MongoDB
connectDB();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


// Apply success handler middleware
app.use(successHandler);

// Middleware to set locale from cookie
app.use((req, res, next) => {
  const locale = req.query.lang || req.cookies.locale || req.headers['accept-language'];
  if (locale) {
    res.setLocale(locale);
  }
  next();
});
// Routes

app.use('/api', userRoute);
app.use('/api', productRoute);
app.use('/api/auth', authRoute); 
app.use('/api/auth', protectedRoute);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});

  
// Path to your JSON file
const jsonFilePath = path.join(__dirname, './test/MOCK_DATA.json');

//  generate and download Excel file
app.get('/download-excel', (req, res) => {
  try {
    // Generate the Excel file from the JSON data
    const excelFilePath = generateExcelFromJSON(jsonFilePath);

    // Send the Excel file
    res.download(excelFilePath, 'users.xlsx', (err) => {
      if (err) {
        console.error('An error occurred while sending the file:', err.message);
      }

       // Delete the temp file after sending
 fs.unlinkSync(excelFilePath);
    });
  } catch (err) {
    console.error('An error occurred:', err.message);
    res.status(500).send('An error occurred while generating the Excel file.');
  }
});
// 
// app.get('/hello', (req, res) => {
//   res.send(res.__('hello')); // Using i18n to get the translation for "hello"
// });
// 
// app.get('/name', (req, res) => {
//   res.send(res.__('anjum_mishra')); // Using i18n to get the translation for "anjum_mishra"
// });


app.get('/get-started', (req, res) => {
  res.json({ message: 'Welcome  To My Website !' });
});

app.get('*', (req, res) => {
    res.status(404).send("<h1>The page you are looking for is not found</h1>");
});


// Use the error handler middleware
app.use(errorHandler);

app.listen(port, (error) => {
    if (!error) 
        console.log(`Server running at http://localhost:${port}`);
    else 
        console.log("Error occurred, server can't start", error);
});

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

//  Get all users
// app.get('/users', (req, res) => {
//     res.json(users);
// });
// 
// Get a single user by ID
// app.get('/users/:id', (req, res) => {
//     const user = users.find(u => u.id == req.params.id);
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).send('User not found');
//     }
// });
// 
// Create a new user
// app.post('/users', (req, res) => {
//     const newUser = {
//         ...req.body
//     };
//     users.push(newUser);
//     res.status(201).json(newUser);
// });
// 
// Update a user by ID
// app.put('/users/:id', (req, res) => {
//     const index = users.findIndex(u => u.id == req.params.id);
//     if (index !== -1) {
//         users[index] = { id: parseInt(req.params.id), ...req.body };
//         res.json(users[index]);
//     } else {
//         res.status(404).send('User not found');
//     }
// });

 // Delete a user by ID
// app.delete('/users/:id', (req, res) => {
//     const index = users.findIndex(u => u.id == req.params.id);
//     if (index !== -1) {
//         users.splice(index, 1);
//         res.status(204).send();
//     } else {
//         res.status(404).send('User not found');
//     }
// });

//  app.get('/', (req, res)=>{ 
//     res.status(200).send("Welcome to the world of Anjum Mishra");  
// }); 

// app.get('/about', (req, res)=>{ 
//     res.set('Content-Type', 'text/html'); 
//     res.status(200).send("<h1>Hello Anjum Mishra!</h1>"); 
//  }); 
// app.post('/', (req, res)=>{ 
//     const requestData = req.body; 
//     console.log('Received data:', requestData); 
//     res.status(200).send(`${requestData .name}`); 

    // const {name} = req.body; 
    // res.send(`Welcome  to world of ${name}`); 
//}) 
  
// app.get('/temp', (req, res)=>{ 
//     res.status(200).send({
//         id:1,
//         name:"anjum mishra"
//     });

// }); 
// app.get('*', (req, res)=>{ 
//     res.status(404).send(" <h1>the page you are looking for is not found </h1>");
//    
// }); 

// app.listen(port, (error) =>{ 
//     if(!error) 
//         console.log(`Server running at http://localhost:${port}`) 
//     else 
//         console.log("Error occurred, server can't start", error); 
//     } 
// );

//mkdir public
//cd  public
//type null > index.html

