const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const searchingRoutes = require('./routes/searchMedRoutes');
const { fetchCSV } = require('./fetchCSV');
const getlist = require('./routes/getMedListRoutes')
const feedback = require('./routes/feedbackRoutes');

const cors = require('cors');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
  {
    origin : ["https://medicine-app-685y.vercel.app","https://medicine-app-685y-62b3sfc33-sahils-projects-b07c5495.vercel.app","https://medicine-app-685y-bz3gr6mki-sahils-projects-b07c5495.vercel.app"],
    methods : ["POST" , "GET"],
    credentials : true
  }
));
app.use(express.json());
app.get("/",(req,res) =>{
  res.json("Hello");
});
app.use('/api/users', userRoutes);
app.use(searchingRoutes);
app.use(getlist);
app.use(feedback);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      fetchCSV();
    });
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));
