import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchDelete, returnDate } from "../../Api_Manager"
import { HomeScreenComment } from "../Comments/HomeScreenComment"

export const DisplaySingleItem = ({ filteredItems, getAllItems }) => {
    const [commentAdd, setCommentAdd] = useState("false")
    const navigate = useNavigate()
    const handleChangeStatus = (event, obj) => {
        event.preventDefault()
        const copy = { ...obj }
        copy.itemId = obj.id
        copy.status = "inactive"

        fetch(`http://localhost:8088/items/${copy.itemId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "PATCH",
            // Sending only the fields that need to be updated
            body: JSON.stringify({
                status: `${copy.status}`

            })
        }).then(() => {
            getAllItems()
        })
    }

    const handleDeleteItem = (event) => {
        fetchDelete(`http://localhost:8088/items/${event.target.id}`).then(() => { getAllItems() })
    }

    return (<>
        {filteredItems.map((itemObj) => {
            return (
                <div className="track-card" key={itemObj.id}>
                    <header className="card__header">
                        <div>Category: {itemObj.category.name}</div>
                        <div className={`${itemObj.status === "active" ? "status-active" : "status-inactive"}`}></div>
                    </header>
                    <div className="track-card-container">
                        <div>
                            <div className="track-card-info">
                                <h5 className="track-card-name">{itemObj.name.toUpperCase()}</h5>
                                Reason: {itemObj.description}
                                <div>Started: {returnDate(itemObj.dateAdded)}</div>
                            </div>

                            <div>
                                <HomeScreenComment itemObj={itemObj}
                                    commentAdd={commentAdd}
                                    setCommentAdd={setCommentAdd}
                                />
                            </div>
                        </div>
                        <div className="item__card__buttons">
                            <span className={`${commentAdd === "true" ? "invisible" : "visible"}`}>
                                <button
                                    id={itemObj.id}
                                    onClick={(event) => {
                                        handleDeleteItem(event)
                                    }}>
                                    Delete Item
                                </button>

                            </span>
                            <span className={`${itemObj.status === "inactive" || commentAdd === "true" ? "invisible" : "visible"}`}>
                                <button
                                    id={itemObj.id}
                                    onClick={(event) => {
                                        navigate(`/items/${itemObj.id}/edit`)
                                    }}>
                                    Edit Item
                                </button>
                                <button
                                    id={itemObj.id}
                                    value={"inactive"}
                                    onClick={(event) => {
                                        handleChangeStatus(event, itemObj)
                                    }}>
                                    Retire Item
                                </button>
                            </span>

                        </div>
                    </div>
                </div>
            )
        })}
    </>)
}