import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchDelete, standardFetch } from "../../Api_Manager"

export const EditComment = ({ item, comment, editComment, setEditComment, getComments, refreshItem }) => {
    const [changeComment, setchangeComment] = useState({
        userComment: "",
        userId: ""
    })

    const handleEditComment = (event) => {
        event.preventDefault()
        setEditComment("true")
        const commentElement = document.querySelector(`#comment--${comment.id}`)
        commentElement.className = "visible"
        standardFetch(`http://localhost:8088/comments/${comment.id}`)
            .then((data) => {
                setchangeComment(data)
            })
    }

    const handleCommitButton = () => {
        fetch(`http://localhost:8088/comments/${comment.id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "PATCH",
            // Sending only the fields that need to be updated
            body: JSON.stringify({
                userComment: `${changeComment.userComment}`,
                dateAdded: `${changeComment.dateAdded}`
            })
        }).then(() => {
            getComments()
            setEditComment("false")
            const commentElement = document.querySelector(`#comment--${changeComment.id}`)
            commentElement.className = "invisible"
        })

    }
    const handleDeleteComment = (event) => {
        fetchDelete(`http://localhost:8088/comments/${event.target.id}`).then(() => { getComments() })

    }


    return <>
        <div className="bottom-Buttons">
            <button
                id={comment.id}
                onClick={(event) => {
                    event.preventDefault()
                    handleEditComment(event)
                }}
                className={`${editComment === "false" && item.status === "active" ? "visible" : "invisible"} btn btn-primary`}>
                Edit Comment
            </button>
            <button
                id={comment.id}
                onClick={(event) => {
                    handleDeleteComment(event)
                }}
                className={`${editComment === "false" ? "visible" : "invisible"} btn btn-primary`}>
                Delete
            </button>
        </div>
        <fieldset>
            <div id={`comment--${comment.id}`}
                className="invisible">
                <div className="card">
                    <div className="card-header">
                        <label
                            className="card-header"
                            htmlFor="userComment">Comment:</label>
                        <input
                            id="userComment"
                            type="text"
                            className="form-control"
                            placeholder="Enter you new comment here."
                            value={changeComment.userComment}
                            onChange={
                                (evt) => {
                                    evt.preventDefault()
                                    const copy = { ...changeComment }
                                    copy[evt.target.id] = evt.target.value
                                    setchangeComment(copy)
                                }}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <button
                    id={comment.id}
                    onClick={(event) => {
                        event.preventDefault()
                        handleCommitButton()
                    }}
                    className="btn btn-primary">
                    Commit Edit
                </button>
                <button
                    type="button"
                    value={"inactive"}
                    onClick={(event) => {
                        refreshItem()
                        const commentElement = document.querySelector(`#comment--${changeComment.id}`)
                        commentElement.className = "invisible"
                        setEditComment("false")
                    }}
                    className={`btn btn-primary`}>
                    Cancel
                </button>
            </div>
        </fieldset>

    </>
}