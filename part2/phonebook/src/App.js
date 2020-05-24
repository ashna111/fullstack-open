import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
    useEffect(() => personService.getAll().then((initialPersons) => { setPersons(initialPersons); setPersonToShow(initialPersons) }), [])

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [personToShow, setPersonToShow] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [messageState, setMessageState] = useState('success')

    const getName = (event) => {
        setNewName(event.target.value)
    }

    const getNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const submit = (event, number) => {
        event.preventDefault();
        const checkIfNameExists = persons.filter(person => person.name === newName)
        if (checkIfNameExists.length !== 0) {
            const id = checkIfNameExists[0].id
            if (window.confirm(`${newName} is already added to phonebook,replace old number with a new one?`)) {
                const personFound = persons.find(n => n.id === id)
                const changedPerson = { ...personFound, number: number }

                personService.update(id, changedPerson).then(returnedPerson => {
                    setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
                    setPersonToShow(persons.map(p => p.id !== id ? p : returnedPerson))
                }).catch(error => {
                    setErrorMessage(`Information of ${newName} has already been removed from the server`)
                    setMessageState('error')
                    setTimeout(() => setErrorMessage(null), 5000)
                    setPersons(persons.filter(p => p.id !== id))
                    setPersonToShow(personToShow.filter(p => p.id !== id))
                })
            }
            setErrorMessage(`Modified number for ${newName}`)
            setMessageState('success')
            setTimeout(() => setErrorMessage(null), 5000)
            setNewName('')
            setNewNumber('')
        } else {
            const newObj = {
                name: newName,
                number: newNumber
            }

            personService.create(newObj)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setPersonToShow(persons.concat(returnedPerson))
                    setErrorMessage(`Added ${newName}`)
                    setMessageState('success')
                    setTimeout(() => setErrorMessage(null), 5000)
                    setNewName('')
                    setNewNumber('')
                }).catch(error => {
                    setErrorMessage(error.response.data.error)
                    setMessageState('error')
                    setTimeout(() => setErrorMessage(null), 5000)
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
            <h2>Phonebook</h2>
            <Notification message={errorMessage} messageState={messageState} />
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