import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	state?: 'normal' | 'selected'
	size?: 'normal' | 'large'
}

export const Button = ({ className, size, state, ...props }: Props) => (
	<button
		className={`${styles.button} ${size === 'large' ? styles.large : ''}${
			state === 'selected' ? styles.selected : ''
		} ${className ? className : ''}`}
		{...props}
	/>
)
