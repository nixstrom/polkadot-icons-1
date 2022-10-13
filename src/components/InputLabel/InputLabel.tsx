import type { LabelHTMLAttributes } from 'react'
import styles from './InputLabel.module.css'

type Props = LabelHTMLAttributes<HTMLLabelElement>

export const InputLabel = ({ className, ...props }: Props) => (
	<label
		className={`${styles.label} ${className ? className : ''}`}
		{...props}
	/>
)
