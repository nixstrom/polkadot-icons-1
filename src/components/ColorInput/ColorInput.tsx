import type { InputHTMLAttributes, ChangeEvent } from 'react'
import styles from './ColorInput.module.css'
import { ChevronDown } from '@icons/ChevronDown'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
	readonly onChange: (val: string) => void
}

export const ColorInput = ({ className, onChange, value, ...props }: Props) => {
	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) =>
		onChange?.(event.target.value)

	return (
		<span className={styles.inputWrapper} data-value={value}>
			<input
				className={`${styles.input} ${className ? className : ''}`}
				onChange={handleOnChange}
				value={value}
				{...props}
				type="color"
			/>
			{value}
			<ChevronDown className={styles.chevron} />
		</span>
	)
}
