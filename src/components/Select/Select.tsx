import { useState, type KeyboardEvent, type MouseEvent } from 'react'
import type { CustomisationContext } from '@providers/CustomisationProvider'
import { ChevronDown } from '@icons/ChevronDown'
import styles from './Select.module.css'

type Props = {
	readonly value: string
	readonly className?: string
	readonly options: ReadonlyArray<string>
	readonly onChange: (val: CustomisationContext['cornerType']) => void
}

type Status = 'idle' | 'focus' | 'active'

export const Select = ({ value, options, className, onChange }: Props) => {
	const [status, setStatus] = useState<Status>('idle')
	const [selectedIndex, setSelectedIndex] = useState(0)

	const handleOnFocus = () => setStatus('focus')
	const handleOnBlur = () => setStatus('idle')
	const handleOnClick = () => setStatus('active')

	const handleOnKeyDownWrapper = (event: KeyboardEvent) => {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			// prevent page scroll when using arrows
			event.preventDefault()
		}

		if (event.key === 'Enter') {
			if (status === 'active') {
				setStatus('idle')
				onChange(options[selectedIndex] as CustomisationContext['cornerType'])
			} else {
				setStatus('active')
			}
		} else if (event.key === 'Escape') {
			setStatus('focus')
		} else if (event.key === 'ArrowUp' && selectedIndex > 0) {
			setSelectedIndex(i => i - 1)
		} else if (
			event.key === 'ArrowDown' &&
			selectedIndex < options.length - 1
		) {
			setSelectedIndex(i => i + 1)
		}
	}

	const handleOnOptionClick = (event: MouseEvent, i: number) => {
		// prevent menu staying open due to registering a click on the wrapper
		event?.stopPropagation()

		setSelectedIndex(i)
		onChange(options[i] as CustomisationContext['cornerType'])
		setStatus('idle')
	}

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<span
			className={`${className} ${styles.inputWrapper}`}
			onFocus={handleOnFocus}
			onBlur={handleOnBlur}
			onClick={handleOnClick}
			onKeyDown={handleOnKeyDownWrapper}
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={0}
		>
			<div
				className={`${styles.options}  ${
					status === 'active' ? styles.optionsActive : ''
				}`}
			>
				{options.map((option, i) => (
					<Option
						key={options[i]}
						selected={selectedIndex === i}
						onClick={(e: MouseEvent) => handleOnOptionClick(e, i)}
					>
						{option}
					</Option>
				))}
			</div>
			{value}
			<ChevronDown className={styles.chevron} />
		</span>
	)
}

const Option = ({
	selected,
	onClick,
	children,
}: {
	readonly selected: boolean
	readonly onClick: (e: MouseEvent<HTMLDivElement>) => void
	readonly children: string
}) => (
	// click handling is handled in parent
	// eslint-disable-next-line jsx-a11y/click-events-have-key-events
	<div className={`${selected ? styles.selected : ''}`} {...{ onClick }}>
		{children}
	</div>
)
