import { React, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import styles from "./Country.module.css"
import getCountryName from '../../utils/getCountryName'
import languagesArray from '../../utils/languagesArray'
import currenciesArray from '../../utils/currenciesArray'
import getGini from '../../utils/getGini'

const getCountry = async (cca3) => {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`)
    const country = await res.json()
    return country[0]
}

const Country = () => {
    const { cod } = useParams()
    const [country, setCountry] = useState(null)
    const [borders, setBorders] = useState([])

    useEffect(() => {
        if (country && country.borders) {
            document.title = getCountryName(country)
            const getBorders = async () => {
                const borders = await Promise.all(country.borders.map(border => getCountry(border)))
                setBorders(borders)
            }
            getBorders()
        }
    }, [country])

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/alpha/${cod}`)
            .then(res => res.json())
            .then(data => setCountry(data[0]))
    }, [cod])

    return (
        <>
            {country && (
                <div className={styles.container}>
                    <div className={styles.container_left}>
                        <div className={styles.overview_panel}>
                            <img src={country.flags.png} alt={country.flags.alt} />

                            <h1 className={styles.overview_name}>{getCountryName(country)}</h1>
                            <p className={styles.overview_region}>{country.region}</p>

                            <div className={styles.overview_numbers}>
                                <div className={styles.overview_population}>
                                    <p className={styles.overview_value}>{country.population}</p>
                                    <p className={styles.overview_label}>Population</p>
                                </div>

                                <div className={styles.overview_area}>
                                    <p className={styles.overview_value}>{country.area}</p>
                                    <p className={styles.overview_label}>Area</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.container_right}>
                        <div className={styles.details_panel}>
                            <h3 className={styles.details_panel_heading}>Details</h3>

                            <div className={styles.details_panel_row}>
                                <div className={styles.details_panel_label}>Capital</div>
                                <div className={styles.details_panel_value}>{country.capital}</div>
                            </div>

                            <div className={styles.details_panel_row}>
                                <div className={styles.details_panel_label}>Subregion</div>
                                <div className={styles.details_panel_value}>{country.subregion}</div>
                            </div>

                            <div className={styles.details_panel_row}>
                                <div className={styles.details_panel_label}>Languages</div>
                                <div className={styles.details_panel_value}>{languagesArray(country.languages).map(language => `${language}`)}</div>
                            </div>

                            <div className={styles.details_panel_row}>
                                <div className={styles.details_panel_label}>Currencies</div>
                                <div className={styles.details_panel_value}>{currenciesArray(country.currencies).map(currency => `${currency}`)}</div>
                            </div>

                            <div className={styles.details_panel_row}>
                                <div className={styles.details_panel_label}>Native name</div>
                                <div className={styles.details_panel_value}>{country.name.nativeName[Object.keys(country.name.nativeName)].common}</div>
                            </div>

                            <div className={styles.details_panel_row}>
                                <div className={styles.details_panel_label}>Gini</div>
                                <div className={styles.details_panel_value}>{getGini(country)} %</div>
                            </div>
                            <div className={styles.details_panel_borders}>
                                <div className={styles.details_panel_borders_label}>Neighbouring Countries</div>
                                <div className={styles.details_panel_borders_container}>
                                    {borders.length ? borders.map(border =>
                                        <Link key={getCountryName(border)} to={`/country/${border.cca3}`} className={styles.details_panel_borders_country}>
                                            <img
                                                className={styles.details_panel_borders_country_image}
                                                src={border.flags.png}
                                                alt={border.flags.alt}
                                            />
                                            <p className={styles.details_panel_borders_country_name}>{getCountryName(border)}</p>
                                        </Link>
                                    ) : <></>}
                                </div>
                                {!borders.length && <p>There are no neighbors</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Country