import React, { useEffect, useCallback, type KeyboardEvent } from 'react'
import { Icon } from './Icon'
import { useSelection } from '@hooks/useSelection'
import { getIconTitle } from '@translations/iconNames'
import type { CustomisationContext as CustomisationContextType } from '@providers/CustomisationProvider'
import styles from './IconList.module.css'

type Props = {
	readonly iconName: string
	readonly ctx: CustomisationContextType
}

export const IconListItem = ({ iconName, ctx }: Props) => {
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

	const buttonLabel = selectedIcons.includes(iconName)
		? `Deselect ${getIconTitle(iconName)}`
		: `Select ${getIconTitle(iconName)}`

	return (
		<li className={styles.listItem}>
			<button
				className={styles.button}
				aria-label={buttonLabel}
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
				aria-labelledby={`label-${iconName}`}
			/>
			<div className={styles.fauxCheckbox} />
			<Icon {...{ ctx, iconName }} />
			<small id={`label-${iconName}`}>{getIconTitle(iconName)}</small>
		</li>
	)
}
