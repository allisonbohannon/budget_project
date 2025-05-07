const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;


app.get('/', (req, res, next) => {
    res.send('Hello, world')
})

const bodyParser = require('body-parser'); 
app.use(bodyParser.json())


//Import Envelopes Router
const envelopesRouter = require('./server/envelopes')
app.use('/envelopes', envelopesRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });