import React, { useState, useRef } from 'react'
import icons from '@nixstrom/polkadot-icons/lib/keyline'
import solidIcons from '@nixstrom/polkadot-icons/lib/solid'
import { useIcon } from './hooks/useIcon'
import type { CustomisationContext as CustomisationContextType } from '@providers/CustomisationProvider'
import styles from './IconList.module.css'

type Props = {
	readonly iconName: string
	readonly ctx: CustomisationContextType
}

const ExternalIcon = ({
	iconName,
	style,
}: {
	readonly iconName: string
	readonly style: CustomisationContextType['style']
}) => {
	const composedKey = iconName as keyof typeof icons
	const solidKey = iconName as keyof typeof solidIcons

	if (style === 'solid' && solidIcons[solidKey]) {
		return solidIcons[solidKey]({})
	}

	if (icons[composedKey]) {
		return icons[composedKey]({})
	}

	return null
}

export const Icon = ({ iconName, ctx }: Props) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	// Used to trigger update in useIcon (since refs don't trigger useEffect)
	const [hasRef, setHasRef] = useState(false)
	const [status] = useIcon({
		containerRef,
		containerHasRef: hasRef,
		ctx,
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
			<ExternalIcon iconName={iconName} style={ctx.style} />
		</div>
	)
}
