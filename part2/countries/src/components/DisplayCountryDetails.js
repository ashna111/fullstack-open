import React from 'react'

const DisplayCountryDetails = ({ searchCountries, input }) => {
    if (input === '') {
        return (
            <></>
        )
    } else if (searchCountries.length > 10) {
        return (
            <div>Too many matches,specify another filter</div>
        )
    } else if (searchCountries.length === 1) {
        const country = searchCountries[0]
        return (
            <>
                <h1>{country.name}</h1>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
                <h2>languages</h2>
                {country.languages.map(language => <li>{language.name}</li>)}
                <br />
                <img src={country.flag} alt="flag" height="150" width="150" />
            </>
        )
    } else {
        return (
            <>
                {searchCountries.map(country => <div>{country.name}</div>)}
            </>
        )
    }

}

export default DisplayCountryDetails