import type { MouseEvent } from 'react'
import type { CustomisationContext } from '@providers/CustomisationProvider'
import { Button } from '@components/Button/Button'
import styles from './RadioButtonGroup.module.css'

type Props = {
	readonly value: string
	readonly label: string
	readonly className?: string
	readonly options: ReadonlyArray<string>
	readonly onChange: (val: CustomisationContext['style']) => void
}

export const RadioButtonGroup = ({
	value,
	label,
	options,
	className,
	onChange,
}: Props) => (
	<fieldset
		className={`${className} ${styles.radioButtonGroup}`}
		role="radiogroup"
	>
		<legend className={styles.hiddenLegend}>{label}</legend>
		<div aria-hidden="true" className={styles.visibleLegend}>
			{label}
		</div>
		{options.map(option => (
			<RadioButton
				key={option}
				selected={option === value}
				onClick={() => onChange(option as CustomisationContext['style'])}
			>
				{option}
			</RadioButton>
		))}
	</fieldset>
)

const RadioButton = ({
	selected,
	onClick,
	children,
}: {
	readonly selected: boolean
	readonly onClick: (e: MouseEvent<HTMLButtonElement>) => void
	readonly children: string
}) => (
	<Button
		className={`${selected ? styles.buttonSelected : ''}`}
		role="radio"
		aria-checked={selected}
		state={`${selected ? 'selected' : 'normal'}`}
		{...{ onClick }}
	>
		{children}
	</Button>
)
