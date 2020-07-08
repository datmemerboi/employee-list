const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());

var PORT = 9090

app.get('/', (req, res)=>{
  res.json("You've reached express server!!");
  res.end();
});

app.post('/data-to-file', (req, res)=>{
  if( req.body ){
    console.log( JSON.stringify(req.body) );
    data = JSON.stringify(req.body);
    fs.writeFile( path.join( __dirname, '..', 'public', 'data', 'data.json' ), data, (err)=>{
      if(err){throw err}
      console.log("Written into file");
    });
  }
})

app.listen(PORT);
console.log(`Server running at: http://localhost:${PORT}`);
