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
                <div className="card " key={itemObj.id}>
                    <div className="card-header">
                        Status: Something Really Cool Will go here
                    </div>
                    <div className="card-body">

                        <h5 className="card-title">{itemObj.name}</h5>
                        <p className="card-text">Description: {itemObj.description}</p>
                        <div>Item Type: {itemObj?.category?.name}</div>
                        <div className="card-text">DateStarted: {returnDate(itemObj.dateAdded)}</div>
                        <div>Status: {itemObj.status}</div>

                        <HomeScreenComment itemObj={itemObj}
                            handleChangeStatus={handleChangeStatus}
                            handleDeleteItem={handleDeleteItem} />

                    </div>
                    <div className="card-footer text-muted">
                        Stretch Goal for how long ago you updated Item.
                    </div>
                </div>


            )
        })}
    </>)
}