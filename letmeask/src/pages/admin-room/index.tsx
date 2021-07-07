import { useHistory, useParams } from "react-router-dom"
import { Button } from "../../components/button"
import { Question } from "../../components/question"
import { RoomCode } from "../../components/room-code"
import { useAuth } from "../../hooks/useAuth"
import { useRoom } from "../../hooks/useRoom"

import logoImg from "../../assets/images/logo.svg"
import deleteImg from "../../assets/images/delete.svg"

import "../../styles/room.scss"
import { database } from "../../services/firebase"

type RoomParams = {
	id: string
}

export const AdminRoom = () => {
	const { user } = useAuth()
	const params = useParams<RoomParams>()

	const roomId = params.id
	const { title, questions } = useRoom(roomId)

	const history = useHistory()

	const handleDeleteQuestion = async (questionId: string) => {
		const confirm = window.confirm(
			"Tem certeza que deseja excluir esta pergunta?"
		)

		if (confirm) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
		}
	}

	const handleEndRoom = async () => {
		await database.ref(`rooms/${roomId}`).update({
			endedAt: new Date(),
		})

		history.push("/")
	}

	return (
		<div id='page-room'>
			<header>
				<div className='content'>
					<img src={logoImg} alt='Letmeask' />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom}>
							Encerrar sala
						</Button>
					</div>
				</div>
			</header>
			<main className='content'>
				<div className='room-title'>
					<h1>Sala {title}</h1>
					{!!questions.length && <span>{questions.length} pergunta(s)</span>}
				</div>
				<div className='question-list'>
					{questions.map(question => (
						<Question
							key={question.id}
							content={question.content}
							author={question.author}
						>
							<button
								type='button'
								onClick={() => handleDeleteQuestion(question.id)}
							>
								<img src={deleteImg} alt='Remover pergunta' />
							</button>
						</Question>
					))}
				</div>
			</main>
		</div>
	)
}
