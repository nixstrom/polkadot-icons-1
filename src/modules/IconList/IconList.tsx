import React from 'react'
import { Box } from '@components/Box/Box'
import { IconListItem } from './IconListItem'
import { useSearch } from '@hooks/useSearch'
import { useCustomisationContext } from '@hooks/useCustomisationContext'
import styles from './IconList.module.css'

export const IconList = () => {
	const { icons } = useSearch()
	// prop drilling to avoid it being called on every icon mount
	const ctx = useCustomisationContext()

	return (
		<Box as="ul" className={styles.list}>
			{icons.map(icon => (
				<IconListItem key={icon} iconName={icon} ctx={ctx} />
			))}
		</Box>
	)
}
