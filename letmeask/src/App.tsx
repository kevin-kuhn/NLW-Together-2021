import { Home } from "./pages/home"
import { NewRoom } from "./pages/new-room"
import { BrowserRouter, Route } from "react-router-dom"

function App() {
	return (
		<BrowserRouter>
			<Route path='/' component={Home} exact />
			<Route path='/rooms/new' component={NewRoom} exact />
		</BrowserRouter>
	)
}

export default App
