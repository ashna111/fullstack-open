const express = require('express')
const app = express()
const PORT = 3001

const morgan = require('morgan')

app.use(express.json()) // for request.body to work
app.use(morgan('tiny'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Green Lantern",
        "number": "90-123456",
        "id": 4
    }
]

const generateId = () => {
    let id = Math.floor(Math.random() * Math.floor(100000))
    return id
}

app.get('/', (req, res) => {
    res.send('Phonebook Backend')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.find(p => p.name === req.body.name)) {
        return res.status(404).json({
            error: 'name already exists'
        })
    }
    const person = {
        name: req.body.name,
        number: req.body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    res.json(persons)
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