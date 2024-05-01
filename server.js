const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://ppraaanav:XBi2P1HIJX0cTxko@cluster0.sly2n9k.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

// Create a Mongoose Schema
const ContactSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    about:String
});

// Create a Mongoose Model
const Contact = mongoose.model('Contact', ContactSchema);

// Middleware to parse JSON requests
app.use(express.static('public'))
app.use(bodyParser.json());

// Route to handle user login
app.post('/contact', async (req, res) => {
  const { firstname,lastname,email,about } = req.body;

  const newcontact=new Contact({
    firstname, lastname, email,about
  });
  await newcontact.save();
  if(newcontact) res.status(200).json({ message: 'saved successful' });
  else res.status(400).json({ message: 'unsuccessful' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
