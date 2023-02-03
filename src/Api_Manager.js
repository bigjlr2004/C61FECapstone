export const standardFetch = (api) => fetch(`${api}`)
    .then(response => response.json())

export const elephantPost = (trunk, peanuts, method = "POST") => {
    return fetch(`${trunk}`, {
        method: `${method}`,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(peanuts)
    })
}

export const fetchDelete = (api) => {
    return fetch(`${api}`, {
        method: "DELETE"
    })
}
export const returnDate = (passedDateString) => {
    let formattedDate = ""
    const date = new Date(passedDateString)
    const month = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()
    return formattedDate = `${month}-${day}-${year}`
}

export const sortbyDate = (arr) => {
    const sorter = (a, b) => {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    }
    return arr.sort(sorter)
}