import type { InputHTMLAttributes, ChangeEvent } from 'react'
import styles from './RangeInput.module.css'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
	readonly onChange: (val: string) => void
}

export const RangeInput = ({ className, onChange, ...props }: Props) => {
	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) =>
		onChange?.(event.target.value)

	return (
		<input
			className={`${styles.input} ${className ? className : ''}`}
			onChange={handleOnChange}
			{...props}
			type="range"
		/>
	)
}
