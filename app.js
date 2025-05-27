const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Data for destinations (Kashmir content)
const destinationsData = {
  "Kashmir Destinations and Attractions": {
    "Major Cities and Towns to Visit": [
      "Srinagar", "Jammu", "Pahalgam", "Gulmarg", "Sonamarg", "Anantnag", "Baramulla", "Kupwara",
      "Awantipora", "Kulgam", "Bandipora", "Ganderbal", "Shopian", "Pulwama", "Bijbehara", "Sopore",
      "Kargil", "Drass", "Leh", "Turtuk"
    ],
    "Famous Lakes and Water Bodies to Explore": [
      "Dal Lake", "Nigeen Lake", "Wular Lake", "Manasbal Lake", "Sheshnag Lake", "Vishansar Lake",
      "Krishansar Lake", "Gangbal Lake", "Gadsar Lake", "Satsar Lake", "Dal Lake Floating Gardens",
      "Nigeen Lake Houseboats", "Sheshnag Lake Trek", "Vishansar Lake Trek", "Krishansar Lake Trek",
      "Gangbal Lake Trek", "Gadsar Lake Trek", "Satsar Lake Trek", "Wular Lake Boating",
      "Manasbal Lake Birdwatching", "Tso Moriri Lake", "Tso Kar Lake", "Pangong Tso", "Suru River",
      "Lidder River", "Shyok River", "Indus River", "Zanskar River"
    ],
    "Beautiful Valleys to Discover": [
      "Betaab Valley", "Aru Valley", "Yusmarg", "Doodhpathri", "Pahalgam Valley", "Lidder Valley",
      "Shamsbari Valley", "Kishtwar Valley", "Suru Valley", "Zanskar Valley", "Gurez Valley",
      "Doda Valley", "Bhaderwah Valley", "Yusmarg Valley", "Nubra Valley"
    ],
    "Stunning Gardens and Parks to Visit": [
      "Shalimar Bagh", "Nishat Bagh", "Chashme Shahi", "Pari Mahal", "Tulip Garden", "Mughal Gardens",
      "Indira Gandhi Memorial Tulip Garden", "Botanical Garden", "Shankaracharya Temple Garden"
    ],
    "Historical and Cultural Sites of Significance": [
      "Shankaracharya Temple", "Hazratbal Shrine", "Jamia Masjid", "Martand Sun Temple", "Awantipora Ruins",
      "Shankaracharya Hill", "Kheer Bhawani Temple", "Pari Mahal", "Mughal Gardens", "Khir Bhawani Temple"
    ],
    "Adventure and Outdoor Activities for Enthusiasts": [
      "Skiing in Gulmarg", "Trekking in Sonamarg", "River Rafting in Lidder River", "Camping in Pahalgam",
      "Paragliding in Gulmarg", "Mountain Biking in Zanskar", "Fishing in Dal Lake", "Horse Riding in Aru Valley",
      "Trekking to Tarsar Marsar", "Snowboarding in Gulmarg"
    ],
    "Wildlife Sanctuaries and National Parks to Explore": [
      "Dachigam National Park", "Hemis National Park", "Kishtwar National Park", "Gulmarg Biosphere Reserve",
      "Shikra Wildlife Sanctuary", "Nandini Wildlife Sanctuary", "Khrew Wildlife Sanctuary",
      "Pahalgam Wildlife Sanctuary", "Wular Lake Wildlife Sanctuary", "Kargil Wildlife Sanctuary"
    ],
    "Festivals and Events Celebrated in Kashmir": [
      "Tulip Festival", "Shikara Festival", "Eid Celebrations", "Lohri Festival", "Baisakhi Festival",
      "Hemis Festival", "Shivratri Celebrations", "Navratri Celebrations", "Christmas Celebrations",
      "New Year Celebrations"
    ],
    "Popular Local Markets and Shopping Destinations": [
      "Lal Chowk", "Polo View Market", "Khadi Gramodyog Bhavan", "Srinagar Floating Market", "Pahalgam Market",
      "Gulmarg Market", "Handicraft Shops in Srinagar", "Kashmiri Shawl Shops", "Spice Market in Srinagar",
      "Local Bazaars in Anantnag"
    ],
    "Additional Remarkable Attractions": [
      "Khilanmarg", "Feroz Shah Kotla", "Shankaracharya Hill", "Zabarwan Range", "Sonmarg Glacier",
      "Thajiwas Glacier", "Sadhna Top", "Sinthan Top"
    ]
  }
};

// Destination images and descriptions

const destinationImages = {
  "Major Cities": {
    "Srinagar": "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg",
    "Gulmarg": "https://images.pexels.com/photos/2686558/pexels-photo-2686558.jpeg",
    "Pahalgam": "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg"
  },
  "Lakes": {
    "Dal Lake": "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg",
    "Nigeen Lake": "https://images.pexels.com/photos/2341830/pexels-photo-2341830.jpeg",
    "Wular Lake": "https://images.pexels.com/photos/2724664/pexels-photo-2724664.jpeg"
  },
  "Gardens": {
    "Shalimar Bagh": "https://images.pexels.com/photos/2480382/pexels-photo-2480382.jpeg",
    "Nishat Bagh": "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg",
    "Tulip Garden": "https://images.pexels.com/photos/2379653/pexels-photo-2379653.jpeg"
  }
};

const destinationDescriptions = {
  "Major Cities": {
    "Srinagar": "The summer capital of Jammu and Kashmir, known for its gardens, lakes and houseboats.",
    "Gulmarg": "A pristine ski resort surrounded by snow-capped mountains and lush meadows.",
    "Pahalgam": "The Valley of Shepherds offering stunning views and adventure activities."
  },
  "Lakes": {
    "Dal Lake": "The jewel of Srinagar, famous for its houseboats and floating gardens.",
    "Nigeen Lake": "A serene lake perfect for water sports and peaceful boat rides.",
    "Wular Lake": "One of Asia's largest freshwater lakes, ideal for nature lovers."
  },
  "Gardens": {
    "Shalimar Bagh": "A Mughal garden built in 1619, featuring stunning fountains and flora.",
    "Nishat Bagh": "The Garden of Joy with terraced lawns and magnificent mountain views.",
    "Tulip Garden": "Asia's largest tulip garden showcasing millions of tulips in spring."
  }
};

// Set up Handlebars view engine
const hbs = exphbs.create({
  helpers: {
    getImage: function(category, name) {
      return destinationImages[category] && destinationImages[category][name] ? destinationImages[category][name] : "";
    },
    getDescription: function(category, name) {
      return destinationDescriptions[category] && destinationDescriptions[category][name] ? destinationDescriptions[category][name] : "";
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Nemo Tour - Explore Kashmir' });
});

app.get('/destinations', (req, res) => {
  res.render('destinations', { 
    title: 'Destinations',
    destinations: destinationsData["Kashmir Destinations and Attractions"]
  });
});

app.get('/booking', (req, res) => {
  // Create a simplified destinations array with key locations
  const destinations = [
    "Srinagar",
    "Gulmarg",
    "Pahalgam",
    "Dal Lake",
    "Sonamarg",
    "Betaab Valley",
    "Tulip Garden",
    "Mughal Gardens",
    "Shankaracharya Temple",
    "Nishat Bagh"
  ];
  
  res.render('booking', { 
    title: 'Book Your Tour',
    destinations: destinations
  });
});

app.post('/booking', (req, res) => {
  const { name, email, destination, date, guests } = req.body;
  res.render('booking-confirmation', {
    title: 'Booking Confirmation',
    name,
    email,
    destination,
    date,
    guests
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Nemo Tour app listening on port ${PORT}`);
});
