const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (replace with your Atlas URI in .env)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema for requests
const requestSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  whatsapp: String,
  items: Array, // e.g., [{item: 'Tomato', qty: 2, price: 100}]
});
const Request = mongoose.model('Request', requestSchema);

// Endpoint for submissions
app.post('/submit', async (req, res) => {
  const newRequest = new Request(req.body);
  await newRequest.save();

  // Send email
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL, pass: process.env.PASS }
  });
  transporter.sendMail({
    from: process.env.EMAIL,
    to: 'yourteam@gmail.com',
    subject: 'New Errand Request',
    text: `Name: ${req.body.name}\nAddress: ${req.body.address}\nItems: ${JSON.stringify(req.body.items)}`
  });


// send whatsapp
  client.messages.create({
  body: `New Request: Type ${req.body.type}\nName: ${req.body.name}\nAddress: ${req.body.address}\nItems/Desc: ${JSON.stringify(req.body.items || req.body.description)}`,
  from: process.env.TWILIO_WHATSAPP_FROM,
  to: process.env.TEAM_WHATSAPP
}).then(message => console.log(message.sid));

  // WhatsApp integration (use Twilio or official API; placeholder for now)
  console.log('Send to WhatsApp: ' + JSON.stringify(req.body));

  res.send({ message: 'Request submitted!' });
});

app.get('/requests', async (req, res) => {
  const requests = await Request.find();
  res.json(requests);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

