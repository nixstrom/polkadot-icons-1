import React from 'react'
import { Box } from '@components/Box/Box'
import { Icon } from './Icon'
import styles from './IconList.module.css'

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

export const IconList = () => (
	<Box as="ul" className={styles.list}>
		{publicIcons.map(icon => (
			<li className={styles.listItem} key={icon}>
				<Icon iconName={icon} />
				<small className={styles.iconName}>{icon}</small>
			</li>
		))}
	</Box>
)
