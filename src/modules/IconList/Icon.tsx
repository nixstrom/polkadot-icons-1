import React, { useState, useRef } from 'react'
import { useIcon } from './hooks/useIcon'
import styles from './IconList.module.css'

type Props = {
	readonly color: string
	readonly strokeWidth: string
	readonly size: string
}

export const Icon = ({
	color,
	strokeWidth,
	size,
	icon,
}: Props & { readonly icon: string }) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	// Used to trigger update in useIcon (since refs don't trigger useEffect)
	const [hasRef, setHasRef] = useState(false)
	const [svg] = useIcon({
		color,
		strokeWidth,
		size,
		icon,
		containerRef,
		containerHasRef: hasRef,
	})

	const handleSetRef = (el: HTMLDivElement) => {
		if (el) {
			// eslint-disable-next-line functional/immutable-data
			containerRef.current = el
			setHasRef(true)
		}
	}

	return svg ? (
		<div
			className={styles.iconContainer}
			dangerouslySetInnerHTML={{ __html: svg }}
			ref={handleSetRef}
		/>
	) : null
}
