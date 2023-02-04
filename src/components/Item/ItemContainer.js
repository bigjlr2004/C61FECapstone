import { useEffect, useState } from "react";
import { standardFetch } from "../../Api_Manager";
import { StartPage } from "../HomePage/StartPage";
import { DisplayItems } from "./DisplayItems";

export const ItemContainer = () => {

    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);
    const [items, setItems] = useState([])
    const [filteredItems, setFiltered] = useState([])
    const [seeAllItems, setSeeAllItems] = useState("")

    const getAllItems = () => {
        standardFetch(`http://localhost:8088/items/?userId=${trackITObject.id}&_expand=category`)
            .then((data) => {
                return setItems(data)
            })
    }
    useEffect(
        () => {
            getAllItems()
        }, [])

    useEffect(
        () => {
            if (seeAllItems) {
                setFiltered(items)
            } else {
                const activeItems = items.filter((item) => {
                    return item.status === "active"
                })
                setFiltered(activeItems)
            }
        }, [seeAllItems])

    useEffect(
        () => {
            const activeItems = items.filter((item) => {
                return item.status === "active"
            })
            setFiltered(activeItems)
        }, [items])



    if (filteredItems.length) {
        return <>
            <h1>Welcome lets review the items you are tracking.</h1>
            <DisplayItems
                filteredItems={filteredItems}

                setSeeAllItems={setSeeAllItems}
                getAllItems={getAllItems}


            />
        </>
    } else {
        return <StartPage />
    }



}