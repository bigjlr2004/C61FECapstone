import { fetchDelete, returnDate } from "../../Api_Manager"
import { HomeScreenComment } from "../Comments/HomeScreenComment"

export const DisplaySingleItem = ({ filteredItems, getAllItems }) => {


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

                    <div className={`${itemObj.status === "active" ? "card-header status-active" : " status-inactive card-header "}`}>
                        <div className="card-title"> First Steps: {returnDate(itemObj.dateAdded)}</div><div>{itemObj?.category?.name.toUpperCase()}</div>
                    </div>
                    <div className="card-body">

                        <h5 className="card-title">{itemObj.name.toUpperCase()}</h5>
                        <h6 className="card-text">Reason: {itemObj.description}</h6>
                    </div>
                    <HomeScreenComment itemObj={itemObj}
                        handleChangeStatus={handleChangeStatus}
                        handleDeleteItem={handleDeleteItem} />
                </div>


            )
        })}
    </>)
}