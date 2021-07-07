import { Home } from "./pages/home"
import { NewRoom } from "./pages/new-room"
import { Room } from "./pages/room"
import { AdminRoom } from "./pages/admin-room"

import { BrowserRouter, Route, Switch } from "react-router-dom"

import { AuthContextProvider } from "./contexts/auth"

function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Switch>
					<Route path='/' component={Home} exact />
					<Route path='/rooms/new' component={NewRoom} exact />
					<Route path='/rooms/:id' component={Room} exact />

					<Route path='/admin/rooms/:id' component={AdminRoom} exact />
				</Switch>
			</AuthContextProvider>
		</BrowserRouter>
	)
}

export default App
