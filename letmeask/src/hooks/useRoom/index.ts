import { useEffect, useState } from "react"
import { database } from "../../services/firebase"
import { useAuth } from "../useAuth"

type QuestionType = {
	id: string
	author: {
		name: string
		avatar: string
	}
	content: string
	isAnswered: boolean
	isHighlighted: boolean
	likeCount: number
	likeId: string | undefined
}

type FirebaseQuestions = Record<
	string,
	{
		author: {
			name: string
			avatar: string
		}
		content: string
		isAnswered: boolean
		isHighlighted: boolean
		likes: Record<
			string,
			{
				authorId: string
			}
		>
	}
>

export const useRoom = (roomId: string) => {
	const { user } = useAuth()
	const [questions, setQuestions] = useState<QuestionType[]>([])
	const [title, setTitle] = useState("")

	useEffect(() => {
		const roomRef = database.ref(`rooms/${roomId}`)

		//TODO: ouvir 'value' significa ouvir toda e qualquer alteração nas listas, caso ouver muitas perguntas
		//este script acaba não sendo performatico!
		//utilizar: doc: firebase -> section-event-types -> child_added, etc
		roomRef.on("value", room => {
			const databaseRoom = room.val()
			const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

			const parsedQuestions = Object.entries(firebaseQuestions).map(
				([key, value]) => {
					return {
						id: key,
						content: value.content,
						author: value.author,
						isHighlighted: value.isHighlighted,
						isAnswered: value.isAnswered,
						likeCount: Object.values(value.likes ?? {}).length,
						likeId: Object.entries(value.likes ?? {}).find(
							([key, like]) => like.authorId === user?.id
						)?.[0],
					}
				}
			)

			setTitle(databaseRoom.title)
			setQuestions(parsedQuestions)
		})

		return () => {
			//poderia escolher qual listener remover dentro de value, passando a ref como segunda dependencia
			//ler doc
			roomRef.off("value")
		}
	}, [roomId, user?.id])

	return { questions, title }
}
