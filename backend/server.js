const express = require('express'); // framework for building web applications
const cors = require('cors'); // middleware to enable Cross-Origin Resource Sharing (CORS)
const helmet = require('helmet'); // secure headers
const { Pool } = require('pg'); // interact with PostgreSQL database
const jwt = require('jsonwebtoken'); // create and verify JWTs

const authRoutes = require('./routes/auth'); // routes for authentication
const postRoutes = require('./routes/posts'); // routes for posts

const app = express(); // create an Express app

// middleware
app.use(cors()); // enable CORS
app.use(express.json()); // parse JSON request bodies
app.use(helmet()); // secure headers

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const port = process.env.PORT || 42069; // port to listen on
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
