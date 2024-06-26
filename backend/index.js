const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https');
const http = require('http');
const fs = require('fs');
const Place = require('./models/places');

require('dotenv').config();

const app = express();
const PORT_HTTP = process.env.PORT_HTTP || 5001;
const PORT_HTTPS = process.env.PORT_HTTPS || 8443;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

// // HTTPS Server
// const httpsOptions = {
//   key: fs.readFileSync('/home/ubuntu/actions-runner/privkey.pem'),
//   cert: fs.readFileSync('/home/ubuntu/actions-runner/fullchain.pem'),
// };

// const httpsServer = https.createServer(httpsOptions, app);
// httpsServer.listen(PORT_HTTPS, () => {
//   console.log(`HTTPS Server running on port ${PORT_HTTPS}`);
// });

// HTTP Server
const httpServer = http.createServer(app);
httpServer.listen(PORT_HTTP, () => {
  console.log(`HTTP Server running on port ${PORT_HTTP}`);
});


// API Routes
app.get('/api/health-check', (req, res) => res.sendStatus(200));

app.get('/api/places', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching places' });
  }
});

app.get('/api/date', async (req, res) => {
  try {
    let collection = await db.collection("date");
    let result = await collection.find().toArray()
    res.send(result[0]).status(200);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching date night' });
  }
}
);

app.post('/api/places', async (req, res) => {
  const data = req.body;
  console.log(data)
  const { name, location, firstTime, selectedCategories, rating, reviews } = data;
  const newPlace = new Place({
    name,
    location,
    firstTime,
    selectedCategories,
    rating,
    reviews,
  });
  console.log(newPlace);  
  try {
    const savedPlace = await newPlace.save();
    res.json(savedPlace);
  }
  catch (error) {
    res.status(500).json({ error: 'Error creating place' });
  }
});

app.delete('/api/places/:id', async (req, res) => {
  try {
    console.log("delete place")
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);
    res.json(deletedPlace);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting place' });
  }
});

app.put('/api/places/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // Find the place by ID
    const placeToUpdate = await Place.findById(id);

    if (!placeToUpdate) {
      return res.status(404).json({ error: 'Place not found' });
    }

    // Update the place fields with the new data
    placeToUpdate.name = updatedData.name || placeToUpdate.name;
    placeToUpdate.location = updatedData.location || placeToUpdate.location;
    placeToUpdate.firstTime = updatedData.firstTime || placeToUpdate.firstTime;
    placeToUpdate.selectedCategories = updatedData.selectedCategories || placeToUpdate.selectedCategories;
    placeToUpdate.rating = updatedData.rating || placeToUpdate.rating;
    placeToUpdate.reviews = updatedData.reviews || placeToUpdate.reviews;

    // Save the updated place
    const updatedPlace = await placeToUpdate.save();

    res.json(updatedPlace);
  } catch (error) {
    res.status(500).json({ error: 'Error updating place' });
  }
});

app.post('/api/categories/add', async (req, res) => {
  try{
  let collection = await db.collection("categories");
  let category = req.body;
  let result = await collection.insertOne(category);
  res.send(result).status(201);
  }
  catch(error){
    res.status(500).json({ error: 'Error creating category' });
  }
}
);

app.get('/api/categories', async (req, res) => {
  try{
  let collection = await db.collection("categories");
  let result = await collection.find().toArray();
  res.send(result).status(200);
  }
  catch(error){
    res.status(500).json({ error: 'Error fetching categories' });
  }
}
);

app.delete('/api/categories/:id', async (req, res) => {
  try{
    let collection = await db.collection("categories");
    let result = await collection.deleteOne({ _id: ObjectId(req.params.id) });
    res.send(result).status(200);
  }
  catch(error){
    res.status(500).json({ error: 'Error deleting category' });
  }
}
);

app.put('/api/categories/:id', async (req, res) => {
  try{
  let collection = await db.collection("categories");
  let result = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
  res.send(result).status(200);
  }
  catch(error){
    res.status(500).json({ error: 'Error updating category' });
  }
});

app.put('/api/date', async (req, res) => {
  try{
    let collection = await db.collection("date");
    let result = await collection.findOneAndUpdate({}, { $set: req.body });
    // send the new date night back to the client
    let updatedDate = await collection.find().toArray();
    res.send(updatedDate).status(200);
  }
  catch(error){
    console.log(error)
    res.status(500).json({ message: 'Error updating date night'});
  }
}
);


