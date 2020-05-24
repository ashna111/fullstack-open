const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3001

//Models
const Person = require('./models/person')

//Middleware
const morgan = require('morgan')

app.use(cors())
app.use(express.json()) // for request.body to work
app.use(express.static('build'))

morgan.token('body', (req) => {
    const body = JSON.stringify(req.body)
    if (body === JSON.stringify({})) {
        return ''
    }
    else {
        return body
    }
})
app.use(morgan(':method :url :status :req[body] - :response-time ms :body'))

//Methods
const generateId = () => {
    let id = Math.floor(Math.random() * Math.floor(100000))
    return id
}


//Routes
app.get('/', (req, res) => {
    res.send('Phonebook Backend')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.post('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    // if (persons.find(p => p.name === req.body.name)) {
    //     return res.status(404).json({
    //         error: 'name already exists'
    //     })
    // }
    const person = new Person({
        name: req.body.name,
        number: req.body.number,
        id: generateId()
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.get('/info', (req, res) => {
    const personInfo = `Phonebook has info for ${persons.length} people`
    const currentDate = new Date()
    res.send(personInfo + "\n" + currentDate)
})

app.listen(PORT, () => {
    console.log("Phonebook backend!")
})