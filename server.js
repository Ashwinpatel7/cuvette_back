const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'https://cuvettee-front.vercel.app', // Your frontend domain
  })
);

// ... your routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
