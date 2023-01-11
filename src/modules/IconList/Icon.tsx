import React, { useState, useRef } from 'react'
import PolkadotIcon from '@nixstrom/polkadot-icons/Icon'
import keyline from '@nixstrom/polkadot-icons/keyline'
import solidIcons from '@nixstrom/polkadot-icons/solid'
import { useIcon } from './hooks/useIcon'
import type { CustomisationContext as CustomisationContextType } from '@providers/CustomisationProvider'
import styles from './IconList.module.css'

type Props = {
	readonly iconName: string
	readonly ctx: CustomisationContextType
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
			{ctx.style === 'solid' ? (
				<PolkadotIcon
					name={iconName as keyof typeof solidIcons}
					variant="solid"
				/>
			) : (
				<PolkadotIcon
					name={iconName as keyof typeof keyline}
					variant="keyline"
					height={89}
				/>
			)}
			<canvas
				id={`canvas-${iconName}`}
				className={styles.canvas}
				height={ctx.iconSize}
				width={ctx.iconSize}
			></canvas>
		</div>
	)
}
