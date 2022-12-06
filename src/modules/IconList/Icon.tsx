import React, { useState, useRef } from 'react'
import allIcons from 'polkadot-icon-package'
import { useIcon } from './hooks/useIcon'
import styles from './IconList.module.css'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-next-line
const ExternalIcon = ({ name }: { readonly name: string }) => allIcons[name]({})

export const Icon = ({ iconName }: { readonly iconName: string }) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	// Used to trigger update in useIcon (since refs don't trigger useEffect)
	const [hasRef, setHasRef] = useState(false)
	const [status] = useIcon({
		iconName,
		containerRef,
		containerHasRef: hasRef,
	})

	//const ExternalIcon = allIcons[`"${iconName}"`] as ReactNode

	const handleSetRef = (el: HTMLDivElement) => {
		if (el) {
			// eslint-disable-next-line functional/immutable-data
			containerRef.current = el
			setHasRef(true)
		}
	}

	// if (status === 'error') return null

	return (
		<div
			ref={handleSetRef}
			className={`${styles.iconContainer} ${
				status === 'loading' ? styles.iconContainerLoading : ''
			}`}
			data-download-name={iconName}
		>
			<ExternalIcon name={iconName} />
		</div>
	)
}
