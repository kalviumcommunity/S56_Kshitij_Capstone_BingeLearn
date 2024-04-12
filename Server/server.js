// Import Statements
const express = require('express');
require('dotenv').config()
const Router = require('./routes')
const { connected, isConnected } = require('./config/db');
const cors = require('cors');

// Calling Functions
const port = process.env.PORT || 3000;
const app = express();

// use of middlewares
app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
  try {
    res.json({
      database: isConnected() ? 'connected' : 'disconnected',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Failed to check the status of Database');
  }
});

  

app.use(Router); 
async function startServer() {
  try {
    await connected();
    app.listen(port, () => {
      console.log(`🚀 server running on PORT: ${port}`);
    });
  } catch (error) {
    console.error('Error occurred:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;
