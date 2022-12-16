import type { InputHTMLAttributes, ChangeEvent } from 'react'
import styles from './RangeInput.module.css'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
	readonly onChange: (val: string) => void
}

export const RangeInput = ({
	className,
	onChange,
	disabled,
	...props
}: Props) => {
	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) =>
		onChange?.(event.target.value)

	return (
		<input
			className={`${styles.input} ${className ? className : ''} ${
				disabled ? styles.disabled : ''
			}`}
			onChange={handleOnChange}
			tabIndex={disabled ? -1 : 0}
			{...props}
			type="range"
		/>
	)
}
