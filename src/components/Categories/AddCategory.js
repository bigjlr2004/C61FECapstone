import { useEffect, useState } from "react"
import { elephantPost } from "../../Api_Manager"
export const AddCategory = ({ setShowAddCategory, item, setItem, getCategories }) => {

    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser)

    const [addCategory, updateAddCategory] = useState({
        name: "",
        userId: trackITObject.id,
        dateAdded: new Date()
    })
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);

        }
    }, [feedback])
    const changeUser = (evt) => {
        evt.preventDefault()
        const copy = { ...AddCategory }
        copy.name = evt.target.value
        updateAddCategory(copy)


    }
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        if (addCategory.name !== "") {

            addCategory.userId = trackITObject.id
            addCategory.dateAdded = new Date()

            /*
                TODO: Perform the PUT fetch() call here to update the profile.
                Navigate user to home page when done.
            */
            elephantPost(`http://localhost:8088/categories`, addCategory, "POST")
                .then((response) => response.json())
                .then((data) => {

                    const itemCopy = { ...item }
                    itemCopy.categoryId = data.id
                    setItem(itemCopy)

                }).then(() => {
                    getCategories()
                    setFeedback("Category successfully saved")
                    setShowAddCategory("false")
                    const copy = { ...AddCategory }
                    copy.name = ""
                    return updateAddCategory(copy)

                })
        } else {
            alert("You need to enter a value for the new category.")
        }
    }


    return <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>

        <h4 className="profile__title">Add New Category</h4>
        <fieldset>
            <div className="card-header">
                <label htmlFor="category">Category Name:</label>
                <input
                    autoFocus
                    placeholder="Enter new category and click either Save or Cancel"
                    type="text"
                    className="form-control"
                    value={addCategory.name}
                    onChange={
                        (evt) => {
                            { changeUser(evt) }
                        }
                    } />
            </div>
        </fieldset>
        <div className="bottom-Buttons">
            <button
                onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}
                >
                Save Category
            </button>
            <button
                onClick={(event) => {
                    event.preventDefault()
                    setShowAddCategory("false")
                    const copy = { ...AddCategory }
                    copy.name = ""
                    updateAddCategory(copy)
                }}
                >
                Cancel
            </button>
        </div>

    </>
}