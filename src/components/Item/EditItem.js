import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { elephantPost, standardFetch } from "../../Api_Manager";
import { Categories } from "../Categories/Categories";

export const EditItem = () => {

    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);
    const navigate = useNavigate()
    const { itemId } = useParams()
    const [item, setItem] = useState({
        name: "",
        categoryId: "",
        description: "",
        userId: trackITObject.id,
        dateAdded: new Date(),

    })
    useEffect(
        () => {
            standardFetch(`http://localhost:8088/items/${itemId}`)
                .then((data) => {
                    const user = data
                    setItem(data)
                })
        }, [])

    const [feedback, setFeedback] = useState("")
    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
            setTimeout(() => navigate("/user_history"), 1500);
        }
    }, [feedback])
    const handleUpdateItem = (event) => {
        event.preventDefault()
        if (
            item.name &&
            item.categoryId
        ) {
            elephantPost(`http://localhost:8088/items/${itemId}`, item, "PUT")
                .then(() => {
                    setFeedback("Item successfully saved")

                })

        }
    }

    const changeItem = (evt) => {
        const copy = { ...item }
        copy[evt.target.id] = evt.target.value
        setItem(copy)
    }
    return (<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="ticketForm">
            <h2 className="ticketForm__title">Edit TrackIT Item</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        id="name"
                        type="text"
                        className="form-control"
                        placeholder="Item Name"
                        value={item.name}
                        onChange={changeItem}
                        autoComplete="off"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Description:</label>
                    <input
                        required autoFocus
                        id="description"
                        type="text"
                        className="form-control"
                        placeholder="Item Description"
                        value={item.description}
                        onChange={changeItem}
                        autoComplete="off"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div id="category-selector">
                    <select
                        className="type-box"
                        value={item.categoryId}
                        id="category"
                        onChange={(event) => {
                            const copy = { ...item }
                            copy.categoryId = parseInt(event.target.value)
                            setItem(copy)
                        }
                        }
                    >
                        {<Categories />}
                    </select>
                </div>

            </fieldset>

            <button
                onClick={(event) => {
                    handleUpdateItem(event)
                }}
                className="btn btn-primary">
                Update Item
            </button>
        </form>

    </>)
}

