const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Place = require('./models/places');
//dotenv
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Replace '*' with your frontend's URL in production
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL , {
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
  const { name, location, firstTime, selectedCategories, rating, reviews } = req.body;
  const newPlace = new Place({
    name,
    location,
    firstTime,
    selectedCategories,
    rating,
    reviews,
  });
});

app.post('/api/categories/add', async (req, res) => {
  let collection = await db.collection("categories");
  let category = req.body;
  let result = await collection.insertOne(category);
  res.send(result).status(201);
}
);

app.get('/api/categories', async (req, res) => {
  let collection = await db.collection("categories");
  let result = await collection.find().toArray();
  res.send(result).status(200);
}
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



