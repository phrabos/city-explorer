const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
const { mungeWeather, mungeLocation, mungeReviews } = require('./munge-utils');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging


app.get('/location', async (req, res) => {
  try {

    const city = req.query.search;
    const response = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${city}&format=json`);

    const finalResponse = mungeLocation(response.body);
   
    res.json(finalResponse);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async (req, res) => {
  try {

    const lat = req.query.latitude;
    const lon = req.query.longitude;

    const response = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_KEY}`);
   
    const finalResponse = mungeWeather(response.body);
    
    res.json(finalResponse);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});



app.get('/reviews', async (req, res) => {
  try {

    const lat = req.query.latitude;
    const lng = req.query.longitude;
    // const header =  { 'Authorization':`Bearer ${process.env.YELP_KEY}` };
      
    const response = await request.get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}`).set('Authorization', `Bearer ${process.env.YELP_KEY}`);
   
    const finalResponse = mungeReviews(response.body);
  
    
    res.json(finalResponse);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});


app.use(require('./middleware/error'));

module.exports = app;
