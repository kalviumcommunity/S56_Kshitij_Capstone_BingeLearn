// Import Statements
const express = require('express');
require('dotenv').config()

// Calling Functions
const port = process.env.PORT || 3000;
const app = express();

// use of middlewares
app.get("/",(req,res) => {
    res.send("Hello")
})

  
if (require.main === module) {
  try {
    connected();
    app.listen(port, async () => {
      console.log(`🚀 server running on PORT: ${port}`);
    });
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
  
  module.exports = app;
