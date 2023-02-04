import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { standardFetch } from "../../Api_Manager"

export const EditComment = ({ item, comment, editComment, setEditComment, getComments, refreshItem }) => {
    const navigate = useNavigate()
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
    return <>

        <button
            id={comment.id}
            onClick={(event) => {
                event.preventDefault()
                handleEditComment(event)
            }}

            className={`${editComment === "false" && item.status === "active" ? "visible" : "invisible"} btn btn-primary`}>
            Edit Comment
        </button>

        <fieldset>
            <div id={`comment--${comment.id}`}
                className="invisible">
                <div className="form-group">
                    <label
                        className={`form -control`}
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