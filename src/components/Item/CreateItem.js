import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { elephantPost} from "../../Api_Manager";
import { Categories } from "../Categories/Categories";

export const CreateItem = () => {

    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);
    const [showAddCategoryOnNewItem, setShowAddCategoryOnNewItem] = useState("false")
    const navigate = useNavigate()
    const [newItem, setNewItem] = useState({
        name: "",
        categoryId: "",
        description: "",
        userId: trackITObject.id,
        dateAdded: new Date(),
        status: "active"
    })

    const [newComment, setNewComment] = useState({
        userComment: "",
        dateAdded: new Date(),
        itemId: ""
    })
    const [feedback, setFeedback] = useState("")
    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
            setTimeout(() => navigate("/homepage"), 1500);


        }
    }, [feedback])
    const handleAddNewItem = (event) => {
        event.preventDefault()
        if (
            newItem.name &&
            newItem.categoryId &&
            newComment.userComment
        ) {
            elephantPost('http://localhost:8088/items', newItem, "POST")
                .then((response) => response.json())
                .then((returnedData) => {
                    const copy = { ...newComment }
                    copy.itemId = returnedData.id

                    elephantPost('http://localhost:8088/comments', copy, "POST")
                        .then((response) => response.json())
                        .then(() => {

                            setFeedback("Item successfully added")
                        })

                }

                )
        } else { alert(`Please complete the form`) }

    }



    const updateItem = (evt) => {
        const copy = { ...newItem }
        copy[evt.target.id] = evt.target.value
        setNewItem(copy)
    }
    return (<>
<main>
        <form>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <fieldset>
            <h2>New TrackIT Item</h2>
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        id="name"
                        type="text"
                        className="form-control"
                        placeholder="Item Name"
                        value={newItem.name}
                        onChange={updateItem}
                        autoComplete="off"
                    />
            </fieldset>
            <fieldset>
                    <label htmlFor="name">Reason:</label>
                    <input
                        required autoFocus
                        id="description"
                        type="text"
                        className="form-control"
                        placeholder="Give a good reason for why you are wanting to track this.."
                        value={newItem.description}
                        onChange={updateItem}
                        autoComplete="off"
                    />
            </fieldset>
            <fieldset>
                {<Categories setItem={setNewItem} item={newItem}
                    setShowAddCategory={setShowAddCategoryOnNewItem}
                    showAddCategory={showAddCategoryOnNewItem} />}
            </fieldset>
            <fieldset>
                    <label htmlFor="description">Comment:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter a good comment to get you started."
                        id="userComment"
                        value={newComment.userComment}
                        autoComplete="off"
                        onChange={(evt) => {
                            const copy = { ...newComment }
                            copy[evt.target.id] = evt.target.value
                            setNewComment(copy)
                        }}
                    />
            </fieldset>
            <div className="bottom-Buttons">
                <button
                    onClick={(event) => {
                        handleAddNewItem(event)
                    }}>
                    Create Item
                </button>
                <button
                    onClick={(event) => {
                        event.preventDefault()
                        navigate("/homepage")
                    }}>
                    Cancel
                </button>
            </div>
        </form>
        </main>
    </>)
}