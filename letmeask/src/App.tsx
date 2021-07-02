import { Home } from "./pages/home"
import { NewRoom } from "./pages/new-room"
import { BrowserRouter, Route } from "react-router-dom"

import { AuthContextProvider } from "./contexts/auth"

function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Route path='/' component={Home} exact />
				<Route path='/rooms/new' component={NewRoom} exact />
			</AuthContextProvider>
		</BrowserRouter>
	)
}

export default App
