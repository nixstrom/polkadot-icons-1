import React, { useState, useRef } from 'react'
import { useIcon } from './hooks/useIcon'
import styles from './IconList.module.css'

export const Icon = ({ iconName }: { readonly iconName: string }) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	// Used to trigger update in useIcon (since refs don't trigger useEffect)
	const [hasRef, setHasRef] = useState(false)
	const [svg, status] = useIcon({
		iconName,
		containerRef,
		containerHasRef: hasRef,
	})

	const handleSetRef = (el: HTMLDivElement) => {
		if (el && status === 'success') {
			// eslint-disable-next-line functional/immutable-data
			containerRef.current = el
			setHasRef(true)
		}
	}

	if (status === 'error') return null

	return (
		<div
			className={`${styles.iconContainer} ${
				status === 'loading' ? styles.iconContainerLoading : ''
			}`}
			dangerouslySetInnerHTML={{ __html: svg }}
			ref={handleSetRef}
			data-download-name={iconName}
		/>
	)
}
