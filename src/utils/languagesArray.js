const languagesArray = obj => {
    if (obj) {
        const result = []
        for (const key in obj) {
            result.push(obj[key])
        }
        return result
    } else {
        return []
    }
}

export default languagesArray