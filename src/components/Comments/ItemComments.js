import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { elephantPost, standardFetch } from "../../Api_Manager"

import { ListComments } from "./ListComments"


export const ItemComments = ({ item, itemId, refreshItem, handleUpdateItem }) => {
    const [itemComments, setItemComments] = useState([])
    const navigate = useNavigate()
    const [showComment, setShowComment] = useState("false")



    const [newComment, setNewComment] = useState({
        dateAdded: new Date(),
        userComment: "",
        itemId: itemId

    })
    const getComments = () => {
        standardFetch(`http://localhost:8088/comments?itemId=${itemId}`)
            .then((data) => {
                setItemComments(data)

            })
    }
    useEffect(
        () => {
            getComments()
        }, [])

    const HandleCommentSubmission = (event) => {
        event.preventDefault()
        if (
            newComment.userComment
        ) {
            elephantPost('http://localhost:8088/comments', newComment, "POST")
                .then((response) => response.json())
                .then(() => {
                    getComments()
                })
            setShowComment("false")

        } else { alert(`Please complete the form`) }
    }

    const changeItem = (evt) => {
        const copy = { ...newComment }
        copy[evt.target.id] = evt.target.value
        setNewComment(copy)
    }



    return (<>


        <span className={`${item.status === "inactive" || showComment === "true" ? "invisible" : "visible"}`}>
            <div className="bottom-Buttons">
                <button
                    id={itemId}
                    onClick={(event) => {
                        event.preventDefault()
                        setShowComment("true")
                    }}
                    className={`${showComment === "false" && item.status === "active" ? "visible" : "invisible"}`}>
                    Add Comment
                </button>
                <button
                    onClick={(event) => {
                        handleUpdateItem(event)
                    }}>
                    Update Item
                </button>
                <button
                    type="button"
                    value={"inactive"}
                    onClick={() => {
                        navigate("/homepage")
                    }}>
                    Cancel
                </button>
            </div>
        </span>

        <span className={`${item.status === "inactive" || showComment === "false" ? "invisible" : "visible"}`}>
            <fieldset>
                <div className="form-group">
                    <label
                       htmlFor="newComment">New Comment:</label>
                    <input
                        required autoFocus
                        id="userComment"
                        type="text"
                        className={`form-control`}
                        placeholder="Enter you new comment here."
                        value={newComment.userComment}
                        onChange={changeItem}
                        autoComplete="off"
                    />
                </div>
                <div className="bottom-Buttons">
                    <button
                        type="button"
                        onClick={() => {
                            setShowComment("false")
                        }}
                        >
                        Cancel
                    </button>
                      <button
                            id={itemId}
                            onClick={(event) => {
                                HandleCommentSubmission(event)
                            }}
                            className={`${showComment === "true" ? "visible" : "offscreen"}`}>
                            Submit
                        </button>
                    </div>
                
            </fieldset>
        </span>
        <span className={`${showComment === "true" ? "offscreen" : "visible"}`}>
            <div>
                <h2>Comment List</h2>
                {<ListComments
                    itemComments={itemComments}
                    item={item}
                    getComments={getComments}
                    refreshItem={refreshItem}
                />}
            </div>
        </span>
    </>)
}