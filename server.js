const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require("nodemailer");
const app = express();
app.use(bodyParser.json());

app.use(cors({origin:"*"}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res){
    res.send('Hello from Brag Tech');
})

app.post('/', async(req, res) => {
    const {email}= req.body;
    const {phone}= req.body;
    const {name}= req.body;
    const {message}= req.body;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'rishwanths2298a@gmail.com',
          pass: 'Suji2298'
        },
      }); 
    
      const msg ={
        
            from:  '"Brag tech" <rishwanths2298a@gmail.com>', // sender address
            to: 'rishwanths2298a@gmail.com', // list of receivers
          
            subject: "Angular Bragtech Form", // Subject line
            text: "Contact Form ", // plain text body
            html: `Name: ${name} , Mail id: ${email} , Mobile Number: ${phone} , Message: ${message}`,
           
             // html body
      }
      // send mail with defined transport object
      const info = await transporter.sendMail(msg);
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


    res.status(200).send({"message": "Data received"});
})

app.listen(process.env.PORT || 3000, function(){
    console.log("SERVER STARTED PORT: 3000");
});


