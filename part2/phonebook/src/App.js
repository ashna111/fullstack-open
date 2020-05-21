import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
    useEffect(() => personService.getAll().then((initialPersons) => { setPersons(initialPersons); setPersonToShow(initialPersons) }), [])

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [personToShow, setPersonToShow] = useState([])

    const getName = (event) => {
        setNewName(event.target.value)
    }

    const getNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const submit = (event) => {
        event.preventDefault();
        const checkIfNameExists = persons.filter(person => person.name === newName)
        if (checkIfNameExists.length !== 0) {
            alert(`${newName} is already added to phonebook`)
            setNewName('')
        } else {
            const newObj = {
                name: newName,
                number: newNumber
            }

            personService.create(newObj)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setPersonToShow(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const filterContent = (event) => {
        const showPerson = persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase()) === true)
        setPersonToShow(showPerson)
    }

    const deletePerson = (event, id, name) => {
        event.preventDefault()
        if (window.confirm(`Delete ${name} ?`)) {
            personService.deletePerson(id).then(response => {
                setPersons(persons.filter(p => p.id !== id))
                setPersonToShow(personToShow.filter(p => p.id !== id))
            })
        }

    }

    return (
        <div>
            <Filter filterContent={filterContent} />
            <PersonForm submit={submit} getNumber={getNumber} getName={getName} newName={newName} newNumber={newNumber} />
            <h2>Numbers</h2>
            {personToShow.map((person, i) => {
                return (
                    <div key={i}>
                        <span>{person.name} {person.number}</span>&nbsp;
                        <button onClick={(event) => deletePerson(event, person.id, person.name)}>delete</button>
                        <br />
                    </div>
                )
            })}
        </div>
    )
}

export default App