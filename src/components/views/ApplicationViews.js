import { Navigate, Outlet, Route, Routes } from "react-router-dom"

import { AllItemsHistory } from "../Item/AllItemHistory"
import { CreateItem } from "../Item/CreateItem"
import { EditItem } from "../Item/EditItem"
import { ItemContainer } from "../Item/ItemContainer"

import { EditUser } from "../UserInfo/EditUser"

export const ApplicationViews = () => {
	return <>
		<Routes>
			<Route path="/" >


				<Route index element={<ItemContainer />} />
				<Route path="new_item" element={<CreateItem />} />
				<Route path="user_history" element={<AllItemsHistory />} />
				<Route path="user_information" element={<EditUser />} />
				<Route path="items/:itemId/edit" element={<EditItem />} />
				<Route path="homepage" element={<ItemContainer />} />



			</Route>
		</Routes>

	</>
}


