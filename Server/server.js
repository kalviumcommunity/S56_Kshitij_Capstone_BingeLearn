// Import Statements
const express = require('express');
require('dotenv').config()
const Router = require('./routes')
const { connected, isConnected } = require('./config/db.js');
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
  }
});
  

app.use(Router); 
if (require.main === module) {
  connected();
  app.listen(port, async () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}
  
  module.exports = app;