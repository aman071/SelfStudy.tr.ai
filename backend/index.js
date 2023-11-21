const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cheerio = require('cheerio');
const { DOMParser } = require('dom-parser');
const previewEmail = require('preview-email');
const nodemailer = require('nodemailer');
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
require('dotenv').config();

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.API_KEY;
const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASS = process.env.USER_PASS;

const app = express();
const port = 8020;

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: USER_EMAIL,
           pass: USER_PASS
       }
});


app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());


// Function to send email with textContent
function sendEmailWithContent(email, generated_text, text) {
    const mailOptions = {
      from: USER_EMAIL, // Sender email address
      to: email, // Recipient email address
      subject: 'Email Subject',
      text: "Here is a summary of what you learnt and an associated quiz. \n"+ generated_text,
      // html: "<h3><p> Here's the summary of what you've learnt </p></h3>" + text
    };
    
    // previewEmail(mailOptions).then(console.log).catch(console.error);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email sent: ' + info.response);
    });
  }
  
// Function to send email with 'text' variable content
function sendEmailWithHTML(email, text) {
    const mailOptions = {
      from: 'selfstudy.tr.ai@gmail.com', // Sender email address
      to: email, // Recipient email address
      subject: 'Email Subject',
      html: text,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email sent: ' + info.response);
    });
  }

async function generate_llm(text) {
  const result = await client.generateMessage({
    model: MODEL_NAME, // Required. The model to use to generate the result.
    temperature: 0.5, // Optional. Value `0.0` always uses the highest-probability result.
    candidateCount: 1, // Optional. The number of candidate results to generate.
    prompt: {
      // optional, preamble context to prime responses
      context: "Act as a quiz generator and make a 10 question quiz from given text. Make a mix of fill in the blank, concept check, true/false, etc",
      // Required. Alternating prompt/response messages.
      messages: [{ content: text }],
    },
  });
  console.log(result[0].candidates[0].content);
  return (result[0].candidates[0].content);
}
  

app.post('/sendData', async (req, res) => {
  const { email, text } = req.body;

  console.log('Email:', email);
  console.log('Text:', text);

  const htmlContent = text;
  const $ = cheerio.load(htmlContent);
  
  // Extract text content
  const textContent = $('body').text();
  console.log('Email after cheerio:', email);
  console.log('Text after cheerio:', textContent);

// const textContent= "- Power ki priority just after brackets and right to left"+
// "- modulus hmesha numerator ka sign Leta hai. And it does not work on floats. Only integers."+
// "- %u is address"+
// "- increment/decrement operator works only on variables. Not constants."+
// "- switch case mei float value mt Dena. It is not allowed."+
// "- bitwise operations are performed right to left"+
// "- by default global variables hold 0, char* holds null. C does not have string datatype."+
// "- auto, register, extern, static"+
// "- pointers mei only subtraction we can do. No other binary operand allowed. When subtracting pointers, also take care to divide by the size of the element to which the pointers are pointing."+
// "- [] Has higher precedence"+
// "- if string is initialized character by character, need to add null character explicitly. If initialized in normal English using char str[20] = Aman or char *str=aman then no need."+
// "- using array notation in above point need to make sure to give one space for null character. If we don\'t write number in [] then compiler allocates size automatically"+
// "- char * se initialize kr dia string to kch change nhi kr skte"+
// "- infix to postfix"+
// "- circular queue"+
// "- heap ";

  const generated_text= await generate_llm(textContent)
  console.log(generated_text);
  // Sending emails
  sendEmailWithContent(email, generated_text, text);
//   sendEmailWithHTML(email, text);


  // Sending a response back to the client
  res.status(200).json({ message: 'Data received successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});