import { Brightness6Rounded } from '@material-ui/icons'
import React, { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'

import styles from "./Layout.module.css"

const Layout = () => {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", localStorage.getItem("theme"))
        localStorage.getItem("theme")
    }, [])

    const switchTheme = () => {
        if (theme === "light") {
            saveTheme("dark")
        } else {
            saveTheme("light")
        }
    }

    const saveTheme = theme => {
        setTheme(theme)
        localStorage.setItem("theme", theme)
        document.documentElement.setAttribute("data-theme", theme)
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/" className={styles.logo}>
                    <img src={require("../../assets/icons/logo.svg").default} alt="logo" />
                </Link>
                <button className={styles.theme_switcher} onClick={switchTheme}>
                    <Brightness6Rounded />
                </button>
            </header>
            <main className={styles.main}>
                <Outlet />
            </main>
            <footer className={styles.footer}>
                <a href="https://restcountries.com">
                    API from REST Countries
                </a>
            </footer>
        </div>
    )
}

export default Layout