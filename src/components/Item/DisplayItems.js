
import { DisplaySingleItem } from "./DisplaySingleItem"

export const DisplayItems = ({ filteredItems, setSeeAllItems, getAllItems }) => {

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
            <DisplaySingleItem
                filteredItems={filteredItems}
                getAllItems={getAllItems}
            />
        </div>
    </>)
}