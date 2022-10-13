import React from 'react'
import { icons } from '@icons/icons'
import { Box } from '@components/Box/Box'
import styles from './IconList.module.css'

type Props = {
	readonly color: string
	readonly strokeWidth: string
	readonly size: string
}

function createMarkup(markup: string) {
	return { __html: markup }
}

export const IconList = ({ color, strokeWidth, size }: Props) => {
	return (
		<Box as="ul" className={styles.list}>
			{icons.map(icon => {
				return (
					<li className={styles.listItem} key={icon.name}>
						<a
							href={
								'data:text/csv;charset=UTF-8,' +
								encodeURIComponent(icon.svg(color, strokeWidth, size))
							}
							download={`${icon.name}.svg`}
							className={styles.download}
						>
							<div
								className={styles.iconContainer}
								dangerouslySetInnerHTML={createMarkup(
									icon.svg(color, strokeWidth, size),
								)}
							/>
							<p>{icon.name}</p>
						</a>
					</li>
				)
			})}
		</Box>
	)
}
