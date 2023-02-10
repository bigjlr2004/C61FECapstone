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
                    className={`${showComment === "false" && item.status === "active" ? "visible" : "invisible"} btn btn-primary`}>
                    Add Comment
                </button>
                <button
                    onClick={(event) => {
                        handleUpdateItem(event)
                    }}
                    className="btn btn-primary">
                    Update Item
                </button>
                <button
                    type="button"
                    value={"inactive"}
                    onClick={() => {
                        navigate("/homepage")
                    }}
                    className={`btn btn-primary`}>
                    Cancel
                </button>
            </div>
        </span>

        <span className={`${item.status === "inactive" || showComment === "false" ? "invisible" : "vsible"}`}>
            <fieldset>

                <div className="form-group">
                    <label
                        className={`form - control`}
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
                        value={"inactive"}
                        onClick={() => {
                            setShowComment("false")
                        }}
                        className={`btn btn-primary`}>
                        Cancel
                    </button>
                    <div className="bottom-Buttons">
                        <button
                            id={itemId}
                            onClick={(event) => {
                                HandleCommentSubmission(event)
                            }}
                            className={`${showComment === "true" ? "visible" : "invisible"} btn btn-primary`}>
                            Submit
                        </button>
                    </div>
                </div>
            </fieldset>
        </span>
        <span className={`${showComment === "true" ? "invisible" : "visible"}`}>
            <h1>Comment List</h1>
            <div className="card-header">
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