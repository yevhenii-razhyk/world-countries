import getCountryName from "./getCountryName"
import getGini from "./getGini"

const orderBy = (countries, direction, value) => {
    if (direction === "asc" && value === "name") {
        return [...countries].sort((a, b) => getCountryName(a) > getCountryName(b))
    } else if (direction === "desc" && value === "name") {
        return [...countries].sort((a, b) => getCountryName(a) < getCountryName(b))
    } else if (direction === "asc" && value === "population") {
        return [...countries].sort((a, b) => a[value] > b[value])
    } else if (direction === "desc" && value === "population") {
        return [...countries].sort((a, b) => a[value] < b[value])
    } else if (direction === "asc" && value === "area") {
        return [...countries].sort((a, b) => a[value] > b[value])
    } else if (direction === "desc" && value === "area") {
        return [...countries].sort((a, b) => a[value] < b[value])
    } else if (direction === "asc" && value === "gini"){
        return [...countries].sort((a, b) => getGini(a) > getGini(b))
    } else if (direction === "desc" && value === "gini"){
        return [...countries].sort((a, b) => getGini(a) < getGini(b))
    } else {
        return countries
    }
}

export default orderBy