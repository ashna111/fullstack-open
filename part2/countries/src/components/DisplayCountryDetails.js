import React, { useState } from 'react'

const SpecificCountry = (props) => {
    const details = props.specificCountry
    const [flag, setFlag] = useState(false)
    const showDetails = () => { setFlag(true) }

    if (!flag) {
        return (
            <>
                <span>{details.name}</span>
                <button onClick={showDetails}>show</button>
                <br />
            </>
        )
    } else if (flag) {
        return (
            <>
                <h1>{details.name}</h1>
                <div>capital {details.capital}</div>
                <div>population {details.population}</div>
                <h2>languages</h2>
                {details.languages.map((language, i) => <li key={i}>{language.name}</li>)}
                <br />
                <img src={details.flag} alt="flag" height="150" width="150" />
                <br />
            </>
        )
    }
}

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
                {country.languages.map((language, i) => <li key={i}>{language.name}</li>)}
                <br />
                <img src={country.flag} alt="flag" height="150" width="150" />
            </>
        )
    } else {
        return (
            <>
                {searchCountries.map((specificCountry, i) => {
                    return (<SpecificCountry key={i} specificCountry={specificCountry} />)
                })}
            </>
        )
    }

}

export default DisplayCountryDetails