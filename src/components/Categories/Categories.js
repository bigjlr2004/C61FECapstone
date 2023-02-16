import { useEffect, useState } from "react"
import { standardFetch } from "../../Api_Manager"
import { AddCategory } from "./AddCategory"

export const Categories = ({ setShowAddCategory, item, setItem, showAddCategory }) => {
    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);
    const [categories, setCategories] = useState([])
    const [] = useState()

    const getCategories = () => {
        standardFetch(`http://localhost:8088/categories`)
            .then((data) => {
                return setCategories(data)
            })
    }

    useEffect(() => {

        getCategories()

    }, [])
    return (<>
       
        <label htmlFor="category"
        className={`${ showAddCategory !== "false" ? "offscreen " : "visible"}`}
        >Categories:</label>
          
            <div className="category__container">
            <select
                className={`${ showAddCategory !== "false" ? "offscreen " : "visible"}`}
                value={item.categoryId}
                id="category"
                onChange={(event) => {
                    const copy = { ...item }
                    copy.categoryId = parseInt(event.target.value)
                    setItem(copy)
                }
                }
            >
                <option>Choose a Category</option>
                {
                    categories.map((category) => {
                        if (category.userId === trackITObject.id || !category.userId) {

                            return (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            )
                        }
                    })
                }
            </select>
            <button
                onClick={(event) => {
                    event.preventDefault()
                    setShowAddCategory("true")
                }}
                className={`${ showAddCategory !== "false" ? "offscreen" : "visible"}`}>
                New Category
            </button>
            </div>
       
        <span className={`${item.status === "active" && showAddCategory === "true" ? "visible" : "offscreen"}`}>
            {<AddCategory getCategories={getCategories}
                showAddCategory={showAddCategory}
                setShowAddCategory={setShowAddCategory}
                setItem={setItem}
                item={item}
            />}
           
        
        </span>
        
            

    </>


    )
}

