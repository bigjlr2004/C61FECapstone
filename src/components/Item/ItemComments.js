import { useEffect, useState } from "react"
import { elephantPost, returnDate, standardFetch } from "../../Api_Manager"

export const ItemComments = ({ item, itemId }) => {
    const [itemComments, setItemComments] = useState([])
    const [showComment, setShowComment] = useState("")
    const [newComment, setNewComment] = useState({
        dateAdded: new Date(),
        userComment: "",
        itemId: itemId

    })
    const getComments = () => {
        standardFetch(`http://localhost:8088/comments?itemId=${itemId}`)
            .then((data) => {
                setItemComments(data)
                setShowComment("")
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

                    setShowComment("")
                    getComments()
                })

        } else { alert(`Please complete the form`) }
    }

    const changeItem = (evt) => {
        const copy = { ...newComment }
        copy[evt.target.id] = evt.target.value
        setNewComment(copy)
    }
    const listComments = (itemComments) => {
        return <>
            {itemComments.map((comment) => {
                return <div className="item-card" key={comment.id}>
                    <div className="item-name">Comment: {comment.userComment}</div>
                    <div className="item-name">Date Added: {returnDate(comment.dateAdded)}</div>
                </div>
            })}

        </>


    }

    return (<>

        <h1>Comment List</h1>
        <div className="items-container">
            {listComments(itemComments)}
            <fieldset>
                <div className={`${showComment === "" ? "invisible" : "visible"}`}>
                    <div className="form-group">
                        <label
                            className={`form - control`}
                            htmlFor="newComment">New Comment:</label>
                        <input
                            required autoFocus
                            id="userComment"
                            type="text"
                            className={`form - control`}
                            placeholder="Item Description"
                            value={newComment.userComment}
                            onChange={changeItem}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <button
                    id={itemId}
                    onClick={(event) => {
                        setShowComment(event.target.id)
                    }}
                    className={`${showComment === "" ? "visible" : "invisible"} btn btn-primary`}>
                    Add Comment
                </button>
                <button
                    id={itemId}
                    onClick={(event) => {
                        HandleCommentSubmission(event)
                    }}
                    className={`${showComment === "" ? "invisible" : "visible"} btn btn-primary`}>
                    Submit
                </button>
            </fieldset>
        </div>





    </>)
}