import React, { useEffect, useCallback, type KeyboardEvent } from 'react'
import { Icon } from './Icon'
import { useSelection } from '@hooks/useSelection'
import { getIconTitle } from '@translations/iconNames'
import type { CustomisationContext as CustomisationContextType } from '@providers/CustomisationProvider'
import styles from './IconList.module.css'

type Props = {
	readonly iconName: string
	readonly style: CustomisationContextType['style']
}

export const IconListItem = ({ iconName, style }: Props) => {
	const { handleOnCheckToggle, handleOnUncheck, selectedIcons } = useSelection()

	const handleOnKeydown = (
		event: KeyboardEvent<HTMLInputElement>,
		name: string,
	) => {
		if (event.key === 'Enter') {
			handleOnCheckToggle(name)
		}
	}

	const uncheckOnUnmount = useCallback(
		() => handleOnUncheck(iconName),
		[handleOnUncheck, iconName],
	)

	useEffect(
		() => () => {
			uncheckOnUnmount()
		},
		[uncheckOnUnmount],
	)

	return (
		<li className={styles.listItem}>
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
			<label
				className={styles.label}
				htmlFor={`checkbox-${iconName}`}
				onClick={() => handleOnCheckToggle(iconName)}
			/>
			<input
				type="checkbox"
				className={styles.checkbox}
				name={`checkbox-${iconName}`}
				checked={selectedIcons.includes(iconName)}
				onChange={() => handleOnCheckToggle(iconName)}
				onKeyDown={event => handleOnKeydown(event, iconName)}
				tabIndex={0}
			/>
			<div className={styles.fauxCheckbox} />
			<Icon iconName={iconName} style={style} />
			<small>{getIconTitle(iconName)}</small>
		</li>
	)
}
