import { useContext } from 'react'
import { AuthContext } from "../../contexts/auth"

export const useAuth = () => {
	const value = useContext(AuthContext)

	return value
}