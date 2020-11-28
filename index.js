const express = require("express");
const path = require("path"); 
const fs = require("fs")
// const bodyparser =require("body-parser")
const app = express();
const port = 8001;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('index.pug', params);
})
app.get('/donateplasmablood', (req, res)=>{ 
    const params = { }
    res.status(200).render('donateplasmablood.pug', params);
})
app.get('/receiveplasmablood', (req, res)=>{ 
    const params = { }
    res.status(200).render('receiveplasmablood.pug', params);
})
app.get('/bedavailibility', (req, res)=>{ 
    const params = { }
    res.status(200).render('bedavailibility.pug', params);
})
app.get('/index', (req, res)=>{ 
    const params = { }
    res.status(200).render('index.pug', params);
})

// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/PlasmaDonorData', {useNewUrlParser: true,useUnifiedTopology:true});

//defining mongoose schema
const contactSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    EmailID: String,
    Address: String,
    City: String,
    State: String,
    DOB: String,
    Age: String,
    BloodGroup: String,
    Sex: String,
    Height: String,
    Weight: String
  });
const PlasmaDonor = mongoose.model('PlasmaDonor', contactSchema);


app.post('/donateplasmablood', (req, res)=>{ 
    var myData= new PlasmaDonor(req.body); 
    myData.save().then(()=>{
        res.send("Your Information has been sent successfully. An authorized BMC officer will call you for the proceedure ahead.Stay Tuned. Thank You for offering a helping hand");
    }).catch(()=>{
        res.status(400).send("An error occured while sending your information. Please try again");
    });
    // res.status(200).render('index.pug');
})


// getting-started.js
const mongoose2 = require('mongoose');
mongoose2.connect('mongodb://localhost/PlasmaReceiverData', {useNewUrlParser: true,useUnifiedTopology:true});

//defining mongoose schema
var contactSchema2 = new mongoose2.Schema({
    FirstName: String,
    LastName: String,
    EmailID: String,
    Address: String,
    City: String,
    State: String,
    DOB: String,
    Age: String,
    BloodGroup: String,
    Sex: String,
    Height: String,
    Weight: String
  });
const PlasmaReceiver = mongoose2.model('PlasmaReceiver', contactSchema2);

app.post('/receiveplasmablood', (req, res)=>{ 
    var myData= new PlasmaReceiver(req.body); 
    myData.save().then(()=>{
        res.send("Your Information has been sent successfully. An authorized BMC officer will call you for the proceedure ahead.Stay Tuned. Thank You for offering a helping hand");
    }).catch(()=>{
        res.status(400).send("An error occured while sending your information. Please try again");
    });
    // res.status(200).render('index.pug');
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
