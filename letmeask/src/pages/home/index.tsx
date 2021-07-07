import { useHistory } from "react-router-dom"
import { useState } from "react"

import { useAuth } from "../../hooks/useAuth"

import illustrationImg from "../../assets/images/illustration.svg"
import logoImg from "../../assets/images/logo.svg"
import googleIconImage from "../../assets/images/google-icon.svg"

import { Button } from "../../components/button"

import { database } from "../../services/firebase"

import "../../styles/auth.scss"

export const Home = () => {
	const history = useHistory()
	const { signInWithGoogle, user } = useAuth()
	const [roomCode, setRoomCode] = useState("")

	const handleCreateRoom = async () => {
		if (!user) {
			await signInWithGoogle()
		}

		history.push("/rooms/new")
	}

	const handleJoinRoom = async (event: React.FormEvent) => {
		event.preventDefault()

		if(roomCode.trim() === "") {
			return
		}

		const roomRef = await database.ref(`rooms/${roomCode}`).get()

		if(!roomRef.exists()) {
			alert('Room does not exists.')
			return
		}

		if(roomRef.val().endedAt) {
			alert('Room already closed.')
			return
		}

		history.push(`/rooms/${roomCode}`)
	}

	return (
		<div id='page-auth'>
			<aside>
				<img
					src={illustrationImg}
					alt='ilustracão simbolizando perguntas e respostas'
				/>
				<strong> Crie salas de Q&amp;A ao-vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo-real</p>
			</aside>
			<main>
				<div className='main-content'>
					<img src={logoImg} alt='Letmeask' />
					<button className='create-room' onClick={handleCreateRoom}>
						<img src={googleIconImage} alt='Letmeask' />
						Crie sua sala com Google
					</button>
					<div className='separator'>ou entre em uma sala</div>
					<form onSubmit={handleJoinRoom}>
						<input
							type='text'
							placeholder='Digite o código da sala'
							onChange={event => setRoomCode(event.target.value)}
							value={roomCode}
						/>
						<Button type='submit'>Entrar na sala</Button>
					</form>
				</div>
			</main>
		</div>
	)
}
