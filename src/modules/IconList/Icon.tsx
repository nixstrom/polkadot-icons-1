import React, { useState, useRef } from 'react'
import icons from '@nixstrom/polkadot-icons/lib/keyline'
import solidIcons from '@nixstrom/polkadot-icons/lib/solid'
import { useIcon } from './hooks/useIcon'
import { useCustomisationContext } from '@hooks/useCustomisationContext'
import type { CustomisationContext as CustomisationContextType } from '@providers/CustomisationProvider'
import styles from './IconList.module.css'

const ExternalIcon = ({
	name,
	style,
}: {
	readonly name: string
	readonly style: CustomisationContextType['style']
}) => {
	const composedKey = name as keyof typeof icons
	const solidKey = name as keyof typeof solidIcons

	if (style === 'solid' && solidIcons[solidKey]) {
		return solidIcons[solidKey]({})
	}

	if (icons[composedKey]) {
		return icons[composedKey]({})
	}

	return null
}

export const Icon = ({ iconName }: { readonly iconName: string }) => {
	const { style } = useCustomisationContext()
	const containerRef = useRef<HTMLDivElement | null>(null)
	// Used to trigger update in useIcon (since refs don't trigger useEffect)
	const [hasRef, setHasRef] = useState(false)
	const [status] = useIcon({
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

	return (
		<div
			ref={handleSetRef}
			className={`${styles.iconContainer} ${
				status === 'loading' ? styles.iconContainerLoading : ''
			}`}
			data-download-name={iconName}
		>
			<ExternalIcon name={iconName} style={style} />
		</div>
	)
}
