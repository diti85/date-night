const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Place = require('./models/places');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Replace '*' with your frontend's URL in production
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://diti85:Dpghma2020@datenight.owmiral.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));




// API Routes
app.get('/api/places', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching places' });
  }
});

app.post('/api/places', async (req, res) => {
  const { name, location, firstTime, category, rating, reviews } = req.body;
  const newPlace = new Place({
    name,
    location,
    firstTime,
    category,
    rating,
    reviews,
  });

  try {
    const savedPlace = await newPlace.save(); // Save new place to database
    res.status(201).json(savedPlace);
  } catch (error) {
    res.status(500).json({ error: 'Error adding place' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



