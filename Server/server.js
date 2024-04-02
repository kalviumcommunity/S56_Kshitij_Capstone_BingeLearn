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
    app.listen(port, () => {
      console.log(`🚀 server running on PORT: ${port}`);
    });
  }
  
  module.exports = app;