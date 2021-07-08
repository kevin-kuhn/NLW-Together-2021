import { FC } from "react"
import classNames from "classnames"

import "./styles.scss"

type QuestionProps = {
	content: string
	author: {
		name: string
		avatar: string
	}
	isAnswered?: boolean
	isHighlighted?: boolean
}

export const Question: FC<QuestionProps> = ({
	content,
	author,
	isAnswered = false,
	isHighlighted = false,
	...props
}) => {
	return (
		<div
			className={classNames(
				"question",
				{ answered: isAnswered },
				{ highlighted: isHighlighted && !isAnswered }
			)}
		>
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
