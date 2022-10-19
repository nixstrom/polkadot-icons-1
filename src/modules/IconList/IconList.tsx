import React from 'react'
import { Box } from '@components/Box/Box'
import { Icon } from './Icon'
import styles from './IconList.module.css'

type Props = {
	readonly color: string
	readonly strokeWidth: string
	readonly size: string
}

// Matches file names of icons in /public/icons
const publicIcons = [
	'Archive Node',
	'Blockchain V2',
	'Boot Node',
	'Connection via light Node',
	'Decentralised Storage',
	'Deposit',
	'Glossary V1',
	'Layer',
	'Layer 1',
	'Layer 2',
	'Layer 3',
	'Layer 4',
	'Light Node',
	'Limited supply',
	'Node',
	'Not able to upgrade',
	'Oracle V1',
	'Proxy',
	'Referenda V1',
	'Remote Node',
	'Teleport',
	'Tools',
	'Upgrade',
	'Whitepaper',
	'Withdraw',
]

export const IconList = ({ color, strokeWidth, size }: Props) => (
	<Box as="ul" className={styles.list}>
		{publicIcons.map(icon => (
			<li className={styles.listItem} key={icon}>
				<Icon {...{ color, strokeWidth, size, icon }} />
				<small className={styles.iconName}>{icon}</small>
			</li>
		))}
	</Box>
)
