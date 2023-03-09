import React from 'react'
import SearchRounded from "@material-ui/icons/SearchRounded"

import styles from "./Search.module.css"

const Search = ({...rest}) => {
    return (
        <div className={styles.wrapper}>
            <SearchRounded />
            <input className={styles.input} type="text" {...rest} />
        </div>
    )
}

export default Search