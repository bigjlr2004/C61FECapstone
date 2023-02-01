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