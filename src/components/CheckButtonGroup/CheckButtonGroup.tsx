import type { MouseEvent, ReactNode } from 'react'
import { Button } from '@components/Button/Button'
import type { DownloadFormat } from '@providers/DownloadProvider'
import type { DownloadContext as DownloadContextType } from '@providers/DownloadProvider'
import styles from './CheckButtonGroup.module.css'

type Props = {
	readonly values: DownloadContextType['formats']
	readonly label: string
	readonly className?: string
	readonly options: ReadonlyArray<DownloadFormat>
	readonly onChange: (val: DownloadFormat) => void
}

export const CheckButtonGroup = ({
	values,
	label,
	options,
	className,
	onChange,
}: Props) => (
	<fieldset className={`${className} ${styles.checkButtonGroup}`}>
		<legend className={styles.hiddenLegend}>{label}</legend>
		<div aria-hidden="true" className={styles.visibleLegend}>
			{label}
		</div>
		<div className={styles.options}>
			{options.map(option => (
				<CheckButton
					key={String(option)}
					selected={!!values[option]}
					onClick={() => onChange(option)}
				>
					{String(option)}
				</CheckButton>
			))}
		</div>
	</fieldset>
)

const CheckButton = ({
	selected,
	onClick,
	children,
}: {
	readonly selected: boolean
	readonly onClick: (e: MouseEvent<HTMLButtonElement>) => void
	readonly children: ReactNode
}) => (
	<Button
		className={`${selected ? styles.buttonSelected : ''}`}
		role="checkbox"
		aria-checked={selected}
		state={`${selected ? 'selected' : 'normal'}`}
		{...{ onClick }}
	>
		{children}
	</Button>
)
