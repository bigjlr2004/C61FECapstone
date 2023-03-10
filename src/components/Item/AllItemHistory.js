import { useEffect, useState } from "react"
import { fetchDelete, returnDate, sortbyDate, sortbyDateDescending, standardFetch } from "../../Api_Manager"

export const AllItemsHistory = () => {

    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);
    const [itemHistory, setItemHistory] = useState([])
    const [sortedHistory, setsortedHistory] = useState([])

    const getAllItems = () => {
        standardFetch(`http://localhost:8088/items/?userId=${trackITObject.id}&_expand=category`)
            .then((data) => {
                return setItemHistory((data))
            })
    }
    useEffect(() => {

        getAllItems()

    }, [])
    useEffect(() => {
        const sorted = sortbyDateDescending(itemHistory)
        setsortedHistory(sorted)

    }, [itemHistory])
    const handleDeleteItem = (event) => {

        fetchDelete(`http://localhost:8088/items/${event.target.id}`).then(() => { getAllItems() })
    }
    return (<>
        <div className="table-color">

            <table className="table table-striped-columns">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Status</th>
                        <th>Date Started</th>
                        <th>Item Type</th>
                        <th>RemoveItem</th>
                    </tr>
                </thead>
                {sortedHistory.map((itemObj) => {
                    return <tbody className="item-history" key={itemObj.id}><tr>
                        <td>{itemObj.name}</td>
                        <td>{itemObj.status}</td>
                        <td>{returnDate(itemObj.dateAdded)}</td>
                        <td>{itemObj?.category?.name}</td>
                        <td><button
                            id={itemObj.id}
                            onClick={(event) => {
                                handleDeleteItem(event)
                            }}
                        >
                            Delete Item
                        </button></td>
                    </tr>
                    </tbody>
                })}
            </table>

        </div>
    </>
    )
}


