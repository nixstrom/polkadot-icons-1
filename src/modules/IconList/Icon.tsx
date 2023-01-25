import React, { type SVGProps } from 'react'
import PolkadotIcon from '@nixstrom/polkadot-icons/Icon'
import keyline from '@nixstrom/polkadot-icons/keyline'
import solidIcons from '@nixstrom/polkadot-icons/solid'
import type { CustomisationContext as CustomisationContextType } from '@providers/CustomisationProvider'
import styles from './IconList.module.css'

type Props = {
	readonly iconName: string
	readonly ctx: CustomisationContextType
}

export const Icon = ({ iconName, ctx }: Props) => {
	const [strokeLinecap, strokeLinejoin] =
		ctx.cornerType === 'round'
			? ['round', 'round']
			: ctx.cornerType === 'bevel'
			? ['square', 'bevel']
			: ['square', 'miter']

	const iconProps = {
		strokeLinecap,
		strokeLinejoin,
		height: ctx.iconSize,
		width: ctx.iconSize,
		stroke: ctx.style === 'solid' ? ctx.fillColor : ctx.strokeColor,
		strokeWidth: ctx.strokeWidth,
		fill: ctx.style === 'line' ? 'none' : ctx.fillColor,
	} as Omit<SVGProps<SVGSVGElement>, 'name'>

	return (
		<div className={styles.iconContainer} data-download-name={iconName}>
			{ctx.style === 'solid' ? (
				<PolkadotIcon
					name={iconName as keyof typeof solidIcons}
					variant="solid"
					{...iconProps}
				/>
			) : (
				<PolkadotIcon
					name={iconName as keyof typeof keyline}
					variant="keyline"
					{...iconProps}
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
