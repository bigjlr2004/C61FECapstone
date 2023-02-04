import { useNavigate } from "react-router-dom"
import { fetchDelete, returnDate } from "../../Api_Manager"
import { HomeScreenComment } from "../Comments/HomeScreenComment"

export const DisplaySingleItem = ({ filteredItems, getAllItems }) => {
    const navigate = useNavigate()

    const handleChangeStatus = (event, obj) => {
        event.preventDefault()
        const copy = { ...obj }
        copy.itemId = obj.id
        copy.status = "inactive"

        fetch(`http://localhost:8088/items/${copy.itemId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "PATCH",

            // Sending only the fields that need to be updated
            body: JSON.stringify({
                status: `${copy.status}`

            })
        }).then(() => {
            getAllItems()
        })
    }

    const handleDeleteItem = (event) => {
        fetchDelete(`http://localhost:8088/items/${event.target.id}`).then(() => { getAllItems() })
    }

    return (<>
        {filteredItems.map((itemObj) => {
            return (
                <div className="item-card" key={itemObj.id}>
                    <div className="item-name">Item: {itemObj.name}</div>
                    <div className="item-name">Status: {itemObj.status}</div>
                    <div className="item-name">Date Started: {returnDate(itemObj.dateAdded)}</div>
                    <div className="item-name">Description: {itemObj.description}</div>
                    <div className="item-name">Item Type: {itemObj?.category?.name}</div>
                    <HomeScreenComment itemObj={itemObj} />
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
                    <button
                        id={itemObj.id}
                        value={"inactive"}
                        onClick={(event) => {
                            handleChangeStatus(event, itemObj)
                        }}
                        className={`${itemObj.status === "inactive" ? "invisible" : "visible"} btn btn-primary`}>
                        Retire Item
                    </button>


                </div>

            )
        })}
    </>)
}