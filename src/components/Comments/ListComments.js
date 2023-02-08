import { useState } from "react"
import { fetchDelete, returnDate } from "../../Api_Manager"
import { EditComment } from "./EditComment"

export const ListComments = ({ itemComments, item, refreshItem, getComments }) => {

    const [editComment, setEditComment] = useState("false")

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

            </div>
        })}
    </>
}