import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { elephantPost, fetchDelete, returnDate, standardFetch } from "../../Api_Manager"
import { EditComment } from "./EditComment"

export const ItemComments = ({ item, itemId, refreshItem }) => {
    const [itemComments, setItemComments] = useState([])
    const navigate = useNavigate()
    const [showComment, setShowComment] = useState("false")
    const [editComment, setEditComment] = useState("false")

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
    const handleDeleteComment = (event) => {
        fetchDelete(`http://localhost:8088/comments/${event.target.id}`).then(() => { getComments() })

    }
    const listComments = (itemComments) => {
        return <>
            {itemComments.map((comment) => {
                return <div className="item-card" key={comment.id}>
                    <div className="item-name">Comment: {comment.userComment}</div>
                    <div className="item-name">Date Added: {returnDate(comment.dateAdded)}</div>
                    <EditComment
                        comment={comment}
                        editComment={editComment}
                        setEditComment={setEditComment}
                        item={item}
                        getComments={getComments}
                        refreshItem={refreshItem}
                    />
                    <button
                        id={comment.id}
                        onClick={(event) => {
                            handleDeleteComment(event)
                        }}
                        className={`${editComment === "false" ? "visible" : "invisible"} btn btn-primary`}>
                        Delete
                    </button>
                </div>
            })}
        </>
    }


    return (<>
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
            type="button"
            value={"inactive"}
            onClick={() => {
                navigate("/homepage")
            }}
            className={`btn btn-primary`}>
            Cancel
        </button>
        <fieldset>
            <div className={`${showComment === "true" ? "visible" : "invisible"}`}>
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
            </div>
            <button
                id={itemId}
                onClick={(event) => {
                    HandleCommentSubmission(event)
                }}
                className={`${showComment === "true" ? "visible" : "invisible"} btn btn-primary`}>
                Submit
            </button>
        </fieldset>
        <h1>Comment List</h1>
        <div className="items-container">
            {listComments(itemComments)}
        </div>





    </>)
}