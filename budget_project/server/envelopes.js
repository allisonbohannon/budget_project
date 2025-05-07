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

//Get all envelopes
envelopesRouter.get('', (req, res, next) => {
    res.send(envelopes)
})

//Get envelope by ID
envelopesRouter.get('/:envelopeId', (req, res, next) => {
    const envelope = envelopes.find(item => item.id === Number(req.params.envelopeId))
    res.send(envelope)
})

//Create new envelope
envelopesRouter.post('', checkInputs, (req, res, next) => {
    const newEnvelope = {
        id: envelopes.length + 2, 
        title: req.body.title, 
        budget: req.body.budget
    } 
    envelopes.push(newEnvelope)
    res.status(201).send(newEnvelope)
})

module.exports = envelopesRouter; 