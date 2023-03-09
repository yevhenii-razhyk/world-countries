import { React, useState, useEffect } from 'react'

import Search from '../components/Search/Search'
import styles from "../styles/HomePage.module.css"
import Countries from './Countries/Countries'
import getCountryName from '../utils/getCountryName'

const HomePage = () => {
    const [countries, setCountries] = useState([])
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        document.title = "World Countries";
        fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then(data => setCountries(data))
    }, [])

    const filteredCountries = countries.filter(country =>
        String(getCountryName(country)).toLowerCase().startsWith(keyword) ||
        String(country.region).toLowerCase().startsWith(keyword) ||
        String(country.subregion).toLowerCase().startsWith(keyword)
    )

    const onInputChange = e => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
    }
 
    return (
        <div>
            <div className={styles.input_container}>
                <p className={styles.count}>Found {filteredCountries.length} countries</p>
                <div className={styles.input}>
                    <Search placeholder="Filter by Name, Region, Subregion" onChange={onInputChange} />
                </div>
            </div>
            <Countries countries={filteredCountries}/>
        </div>
    )
}

export default HomePage