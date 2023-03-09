import { Link } from 'react-router-dom'
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons'
import React, { useState } from 'react'

import styles from "./Countries.module.css"
import getCountryName from '../../utils/getCountryName'
import getGini from '../../utils/getGini'
import orderBy from '../../utils/orderBy'

const SortArrow = ({direction}) => {
    if (direction === "asc") {
        return  (
            <div className={styles.heading_arrow}>
                <KeyboardArrowUpRounded />
            </div>
        )
    } else if (direction === "desc") {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowDownRounded />
            </div>
        )
    } else {
        return <></>
    }
}

const Countries = ({ countries }) => {
    const [direction, setDirection] = useState(null)
    const [value, setValue] = useState(null)
    const [showCountry, setShowCountry] = useState(10)

    const switchDirection = () => {
        if (!direction) {
            setDirection("desc")
        } else if (direction === "desc") {
            setDirection("asc")
        } else {
            setDirection(null)
        }
    }

    const setValueAndDirection = value => {
        switchDirection()
        setValue(value)
    }

    const orderedCountries = orderBy(countries, direction, value)

    const showMore = () => {
        setShowCountry(showCountry + 10)
    }

    const showLess = () => {
        setShowCountry(showCountry - 10)
    }

    return (
        <div>
            <div className={styles.heading}>
                <div className={styles.heading_flag}></div>
                <button className={styles.heading_name} onClick={() => setValueAndDirection("name")}>
                    <div>Name</div>
                    {value === "name" 
                    ? 
                        <SortArrow direction={direction} />
                    :   <></>
                    }
                </button>

                <button className={styles.heading_population} onClick={() => setValueAndDirection("population")}>
                    <div>Population</div>
                    {value === "population" 
                    ? 
                        <SortArrow direction={direction} />
                    :   <></>
                    }
                </button>

                <button className={styles.heading_area} onClick={() => setValueAndDirection("area")}>
                    <div>Area (km<sup>2</sup>)</div>
                    {value === "area" 
                    ? 
                        <SortArrow direction={direction} />
                    :   <></>
                    }
                </button>

                <button className={styles.heading_gini} onClick={() => setValueAndDirection("gini")}>
                    <div>Gini</div>
                    {value === "gini" 
                    ? 
                        <SortArrow direction={direction} />
                    :   <></>
                    }
                </button>
            </div>

            {[...orderedCountries].slice(0, showCountry).map(country =>
                <Link key={getCountryName(country)} to={`/country/${country.cca3}`} className={styles.row}>
                    <div className={styles.flag}>
                        <img src={country.flags.png} alt={getCountryName(country)} />
                    </div>
                    <p className={styles.name}>{getCountryName(country)}</p>
                    <p className={styles.population}>{country.population}</p>
                    <p className={styles.area}>{country.area || 0}</p>
                    <p className={styles.gini}>{getGini(country)} %</p>
                </Link>
            )}

            <div className={styles.buttons}>
                {showCountry >= 20 && <button onClick={showLess}>Show less</button>}
                {orderedCountries.length > showCountry && <button onClick={showMore}>Show more</button>}
            </div>
        </div>
    )
}

export default Countries