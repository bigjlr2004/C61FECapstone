import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { HomePage } from "../HomePage/HomePage"
import { AllItemsHistory } from "../Item/AllItemHistory"
import { CreateItem } from "../Item/CreateItem"
import { EditItem } from "../Item/EditItem"

import { EditUser } from "../UserInfo/EditUser"

export const ApplicationViews = () => {
	return <>
		<Routes>
			<Route path="/" element={<Navigate to="/homepage" />}>

				<Route
					path="*"
					element={<Navigate to="/" />}
				/>
			</Route>
			<Route path="/" element={
				<>


					<Outlet />
				</>
			}>
				<Route path="new_item" element={<CreateItem />} />
				<Route path="user_history" element={<AllItemsHistory />} />
				<Route path="user_information" element={<EditUser />} />
				<Route path="items/:itemId/edit" element={<EditItem />} />
				<Route path="homepage" element={<HomePage />} />


			</Route>
		</Routes>

	</>
}


