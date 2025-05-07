const express = require('express');
const envelopesRouter = express.Router();

const envelopes = [
    {id: 1, 
     title: 'Rainy day fund', 
     budget: 5000   
    }, 
    {id: 2, 
     title: 'Food', 
     budget: 2000
    }, 
    {id: 3, 
     title: 'Bills',
     budget: 500
    }
]

//Validation middleware
const checkInputs = (req, res, next) => {
    if (req.body.title && req.body.budget && typeof req.body.budget === 'number') {
        next();
    } else {
        res.status(400).send('Improper inputs')
    }
}

envelopesRouter.get('', (req, res, next) => {
    res.send(envelopes)
})
envelopesRouter.post('', checkInputs, (req, res, next) => {
    res.send(req.body)
})

module.exports = envelopesRouter; 