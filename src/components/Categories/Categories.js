import { useEffect, useState } from "react"
import { standardFetch } from "../../Api_Manager"

export const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        standardFetch(`http://localhost:8088/categories`)
            .then((data) => {
                return setCategories(data)
            })


    }, [])


    return (<>
        <option>Choose a Category</option>
        {
            categories.map((category) => {
                return (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                )
            })
        }
    </>


    )
}