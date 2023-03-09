const getGini = country => {
    if (country.gini) {
        return country.gini[Object.keys(country.gini)]
    } else {
        return 0
    }
}

export default getGini