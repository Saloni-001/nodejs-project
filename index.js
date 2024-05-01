const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const User = require('./models/User');

// Initialize Express
const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://root:Root_123@devapi.itgv8de.mongodb.net/nodejs-project?retryWrites=true&w=majority&appName=DevAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// Passport Configuration
require('./config/passport')(passport); 

// Routes
app.use('/api/auth', require('./routes/auth')); 
app.use('/api/posts', require('./routes/posts'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
