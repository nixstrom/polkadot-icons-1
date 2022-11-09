import React, { useState, type KeyboardEvent } from 'react'
import { Box } from '@components/Box/Box'
import { Icon } from './Icon'
import { useSearch } from '@hooks/useSearch'
import styles from './IconList.module.css'

export const IconList = () => {
	const [checked, setChecked] = useState<readonly string[]>([])
	const { icons } = useSearch()

	const handleOnCheck = (icon: string) => {
		if (checked.includes(icon)) {
			setChecked(prevChecked => prevChecked.filter(c => !(c === icon)))
		} else {
			setChecked(prevChecked => [...prevChecked, icon])
		}
	}

	const handleOnKeydown = (
		event: KeyboardEvent<HTMLInputElement>,
		icon: string,
	) => {
		if (event.key === 'Enter') {
			handleOnCheck(icon)
		}
	}

	return (
		<Box as="ul" className={styles.list}>
			{icons.map(icon => (
				<li className={styles.listItem} key={icon}>
					{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
					<label
						className={styles.label}
						htmlFor={`checkbox-${icon}`}
						onClick={() => handleOnCheck(icon)}
					/>
					<input
						type="checkbox"
						className={styles.checkbox}
						name={`checkbox-${icon}`}
						checked={checked.includes(icon)}
						onChange={() => handleOnCheck(icon)}
						onKeyDown={event => handleOnKeydown(event, icon)}
						tabIndex={0}
					/>
					<div className={styles.fauxCheckbox} />
					<Icon iconName={icon} />
					<small>{icon}</small>
				</li>
			))}
		</Box>
	)
}
