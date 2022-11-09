import React from 'react'
import { Box } from '@components/Box/Box'
import { Icon } from './Icon'
import { useSearch } from '@hooks/useSearch'
import styles from './IconList.module.css'

export const IconList = () => {
	const { icons } = useSearch()

	return (
		<Box as="ul" className={styles.list}>
			{icons.map(icon => (
				<li className={styles.listItem} key={icon}>
					<Icon iconName={icon} />
					<small>{icon}</small>
				</li>
			))}
		</Box>
	)
}
