const currenciesArray = obj => {
    if (obj) {
        const result = []
        for (const key in obj) {
            result.push(obj[key].name)
        }
        return result
    } else {
        return []
    }
}

export default currenciesArray