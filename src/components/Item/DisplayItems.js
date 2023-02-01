import { useNavigate } from "react-router-dom"


export const DisplayItems = ({ items, handleDeleteItem }) => {
    const navigate = useNavigate()
    const returnDate = (passedDateString) => {
        let formattedDate = ""
        const date = new Date(passedDateString)
        const month = date.getMonth()
        const day = date.getDate()
        const year = date.getFullYear()
        return formattedDate = `${month}, ${day}, ${year}`
    }

    return (<>
        <h1>Item List</h1>
        <div className="items-container">
            {items.map((itemObj) => {
                return (
                    <div className="item-card" key={itemObj.id}>
                        <div className="item-name">Item: {itemObj.name}</div>
                        <div className="item-name">Date Started: {returnDate(itemObj.dateAdded)}</div>
                        <div className="item-name">Description: {itemObj.description}</div>
                        <div className="item-name">Item Type: {itemObj?.category?.name}</div>
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
                    </div>
                )
            })}
        </div>
    </>)
}