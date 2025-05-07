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

const findIndex = (req, res, next) => {
    const index = envelopes.findIndex(item => item.id === Number(req.params.envelopeId))
    if (index === -1) {
        res.status(404).send('Envelope not found')
    } else {
        req.index = index; 
        next(); 
    }
}

//Get all envelopes
envelopesRouter.get('', (req, res, next) => {
    res.send(envelopes)
})

//Get envelope by ID
envelopesRouter.get('/:envelopeId', findIndex, (req, res, next) => {
    res.send(envelopes[req.index])
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

//Change money in envelope
envelopesRouter.put('/:envelopeId', findIndex, (req, res, next) => {
    const envelope = envelopes[req.index]
    if (envelope.budget - req.body.budget < 0 ) {
        res.status(404).send('You spent too much!')
    } else {
        envelope.budget -= req.body.budget; 
        res.send(envelope)
    }
})

//Delete an envelope
envelopesRouter.delete('/:envelopeId', (req, res, next) => {
    envelopes.splice(req.index, 1)
    res.status(204).send()
})

module.exports = envelopesRouter; 