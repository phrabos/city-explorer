const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging


app.get('/location', async (req, res) => {
  try {

    const city = req.query.search;
    const response = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${city}&format=json`);
   
   
    
    res.json(
      {
        formatted_query: response.body[0].display_name,
        latitude: response.body[0].lat,
        longitude: response.body[0].lon,
      }
    );
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async (req, res) => {
  try {

    // const city = req.query.search;
    const response = await request.get(`${process.env.WEATHER_KEY}`);
   
   
    
    res.json(
      {
        formatted_query: response.body[0].display_name,
        latitude: response.body[0].lat,
        longitude: response.body[0].lon,
      }
    );
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
