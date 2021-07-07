import { FC } from "react"

import "./styles.scss"

type QuestionProps = {
	content: string
	author: {
		name: string
		avatar: string
	}
}

export const Question: FC<QuestionProps> = ({ content, author, ...props }) => {
	return (
		<div className='question'>
			<p>{content}</p>
			<footer>
				<div className='user-info'>
					<img src={author.avatar} alt={author.name} />
					<span>{author.name}</span>
				</div>
				<div>{props.children}</div>
			</footer>
		</div>
	)
}
