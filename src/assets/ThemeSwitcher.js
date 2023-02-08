import { Link, useNavigate } from "react-router-dom"


export const ThemeSwitcher = () => {
    const navigate = useNavigate()
    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form className="card">
                <h2 className="ticketForm__title">New TrackIT Item</h2>
                <fieldset>
                    <div className="card-header">
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
                    </div>
                </fieldset>
                <fieldset>
                    <div className="card-header">
                        <label htmlFor="name">Description:</label>
                        <input
                            required autoFocus
                            id="description"
                            type="text"
                            className="form-control"
                            placeholder="Item Description"
                            value={newItem.description}
                            onChange={updateItem}
                            autoComplete="off"
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div id="category-selector">
                        <select
                            className="type-box card header"
                            value={newItem.categoryId}
                            id="category"
                            onChange={(event) => {
                                const copy = { ...newItem }
                                copy.categoryId = parseInt(event.target.value)
                                setNewItem(copy)
                            }
                            }
                        >
                            {<Categories />}
                        </select>
                    </div>

                </fieldset>
                <fieldset>
                    <div className="card-header">
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
                    </div>
                </fieldset>
                <button
                    onClick={(event) => {
                        handleAddNewItem(event)
                    }}
                    className="btn btn-primary">
                    Create Item
                </button>
                <button
                    onClick={(event) => {
                        event.preventDefault()
                        navigate("/homepage")
                    }}
                    className="btn btn-primary">
                    Cancel
                </button>
            </form>

        </>
    )
}