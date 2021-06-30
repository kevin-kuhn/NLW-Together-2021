import { useState } from 'react'

type ButtonProps = {
	text: string
}

export const Button = (props: ButtonProps) => {
	const [counter, setCounter] = useState(0)
	
	const incremet = () => {
		setCounter(counter => counter ++)
	}

	return (
		<button onClick={incremet}>{counter}</button>
	)
}
