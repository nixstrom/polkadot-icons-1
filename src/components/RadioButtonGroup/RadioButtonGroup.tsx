import type { MouseEvent } from 'react'
import { Button } from '@components/Button/Button'
import styles from './RadioButtonGroup.module.css'

type Props<Value> = {
	readonly value: Value
	readonly label: string
	readonly className?: string
	readonly options: ReadonlyArray<Value>
	readonly onChange: (val: Value) => void
}

export const RadioButtonGroup = <Value extends string>({
	value,
	label,
	options,
	className,
	onChange,
}: Props<Value>) => (
	<fieldset
		className={`${className} ${styles.radioButtonGroup}`}
		role="radiogroup"
	>
		<legend className={styles.hiddenLegend}>{label}</legend>
		<div aria-hidden="true" className={styles.visibleLegend}>
			{label}
		</div>
		<div className={styles.options}>
			{options.map(option => (
				<RadioButton
					key={String(option)}
					selected={option === value}
					onClick={() => onChange(option as Value)}
				>
					{String(option)}
				</RadioButton>
			))}
		</div>
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
