import { useEffect, useState } from "react";
import { sortbyDate, sortbyDateDescending, standardFetch } from "../../Api_Manager";
import { StartPage } from "../HomePage/StartPage";
import { DisplayItems } from "./DisplayItems";

export const ItemContainer = () => {

    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);
    const [items, setItems] = useState([])
    const [filteredItems, setFiltered] = useState([])
    const [seeAllItems, setSeeAllItems] = useState(false)

    const getAllItems = () => {
        standardFetch(`http://localhost:8088/items/?userId=${trackITObject.id}&_expand=category`)
            .then((data) => {
                sortbyDateDescending(data)
                return setItems(data)

            })
    }
    useEffect(
        () => {
            getAllItems()
        }, [])
    useEffect(
        () => {
            const activeItems = items.filter((item) => {
                return item.status === "active"
            })
            setFiltered(activeItems)
        }, [items])

    useEffect(
        () => {
            if (seeAllItems) {
                let copy = [...items]
                sortbyDate(copy)
                setFiltered(copy)
            } else {
                const activeItems = items.filter((item) => {
                    return item.status === "active"
                })

                setFiltered(activeItems)
            }
        }, [seeAllItems])

    if (filteredItems.length) {
        return <>
            <DisplayItems
                filteredItems={filteredItems}
                setSeeAllItems={setSeeAllItems}
                getAllItems={getAllItems}
                seeAllItems={seeAllItems}
            />
        </>
    } else {
        return <StartPage />
    }



}