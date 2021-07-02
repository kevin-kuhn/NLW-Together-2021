import { useHistory } from "react-router-dom"

import { useAuth } from '../../hooks/useAuth'

import illustrationImg from "../../assets/images/illustration.svg"
import logoImg from "../../assets/images/logo.svg"
import googleIconImage from "../../assets/images/google-icon.svg"

import { Button } from "../../components/button"

import "../../styles/auth.scss"

export const Home = () => {
	const history = useHistory()
	const { signInWithGoogle, user } = useAuth()

	const handleCreateRoom = async () => {
		if (!user) {
			await signInWithGoogle()
		}

		history.push("/rooms/new")
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
					<form>
						<input type='text' placeholder='Digite o código da sala' />
						<Button type='submit'>Entrar na sala</Button>
					</form>
				</div>
			</main>
		</div>
	)
}
