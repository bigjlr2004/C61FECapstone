import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { elephantPost, returnDate, sortbyDate, standardFetch } from "../../Api_Manager"

export const HomeScreenComment = ({ itemObj, handleDeleteItem, handleChangeStatus }) => {
    const navigate = useNavigate()
    const [allComments, setAllComments] = useState([])
    const [commentAdd, setCommentAdd] = useState("false")
    const [addComment, setAddComment] = useState({
        userComment: ""
    })

    const getComments = () => {
        standardFetch(`http://localhost:8088/comments`)
            .then((data) => {
                setAllComments(data)
            })
    }
    useEffect(() => {
        getComments()
    }, [])

    const handleShowCommentField = (event, itemId) => {
        const commentElement = document.querySelector(`#item--${itemId}`)
        commentElement.className = "visible"
        setCommentAdd("true")
    }
    const getLastComment = (passedItemId) => {
        const filteredComments = allComments.filter(comment => parseInt(comment.itemId) === passedItemId)
        const sortedComments = sortbyDate(filteredComments)
        let last = (sortedComments[filteredComments.length - 1])
        return <div>Comment Added: {returnDate(last?.dateAdded)} {last?.userComment} </div>
    }
    const changeItem = (evt) => {
        const copy = { ...addComment }
        copy[evt.target.id] = evt.target.value
        setAddComment(copy)
    }
    const HandleCommentSubmission = (event, itemId) => {
        event.preventDefault()
        if (
            addComment.userComment
        ) {
            addComment.itemId = itemId
            addComment.dateAdded = new Date()
            elephantPost('http://localhost:8088/comments', addComment, "POST")
                .then((response) => response.json())
                .then(() => {
                    getComments()
                })
            const commentElement = document.querySelector(`#item--${itemId}`)
            commentElement.className = "invisible"
            setCommentAdd("false")
            addComment.userComment = ""

        } else { alert(`Please complete the form`) }
    }
    return (<>

        <div>{getLastComment(itemObj.id)}</div>


        <div id={`item--${itemObj.id}`}
            className="invisible">
            <input
                required autoFocus
                id="userComment"
                type="text"
                className={`form-control`}
                placeholder="Enter you new comment here."
                value={addComment?.userComment}
                onChange={(event) => {
                    changeItem(event)
                }}
                autoComplete="off"
            />
            <button
                id={itemObj.id}
                onClick={(event) => {
                    HandleCommentSubmission(event, itemObj.id)
                }}
                className="btn btn-primary">
                Submit
            </button>
            <button
                id={itemObj.id}
                onClick={(event) => {
                    setCommentAdd("false")
                    const commentElement = document.querySelector(`#item--${itemObj.id}`)
                    commentElement.className = "invisible"
                    addComment.userComment = ""

                }}
                className="btn btn-primary">
                Cancel
            </button>
        </div>
        <div className="bottom-Buttons">
            <span className={`${itemObj.status === "inactive" || commentAdd === "true" ? "invisible" : "visible"}`}>
                <a
                    id={itemObj.id}
                    value={"inactive"}
                    onClick={(event) => {
                        handleShowCommentField(event, itemObj.id)
                    }}
                    className={`btn btn-primary`}>
                    New Comment
                </a>
            </span>
            <span className={`${commentAdd === "true" ? "invisible" : "visible"}`}>
                <button
                    id={itemObj.id}
                    onClick={(event) => {
                        handleDeleteItem(event)
                    }}
                    className="btn btn-primary">
                    Delete Item
                </button>
                <button
                    id={itemObj.id}
                    onClick={(event) => {
                        navigate(`/items/${itemObj.id}/edit`)
                    }}
                    className="btn btn-primary">
                    Edit Item
                </button>

            </span>
            <span className={`${itemObj.status === "inactive" || commentAdd === "true" ? "invisible" : "visible"}`}>
                <button
                    id={itemObj.id}
                    value={"inactive"}
                    onClick={(event) => {
                        handleChangeStatus(event, itemObj)
                    }}
                    className={`btn btn-primary`}>
                    Retire Item
                </button>
            </span>


        </div>
    </>)
}