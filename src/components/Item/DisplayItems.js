import { useNavigate } from "react-router-dom"
import { returnDate } from "../../Api_Manager"

export const DisplayItems = ({ filteredItems, handleDeleteItem, setSeeAllItems }) => {
    const navigate = useNavigate()


    return (<>

        <button
            id={"seeAll-btn"}
            onClick={() => {
                setSeeAllItems("true")
            }}
            className="btn btn-primary">
            All Items
        </button>
        <button
            id={"seeAll-btn"}
            onClick={() => {
                setSeeAllItems("")
            }}
            className="btn btn-primary">
            Active Items
        </button>
        <div className="active-items-container">
            {filteredItems.map((itemObj) => {
                return (
                    <div className="item-card" key={itemObj.id}>
                        <div className="item-name">Item: {itemObj.name}</div>
                        <div className="item-name">Status: {itemObj.status}</div>
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