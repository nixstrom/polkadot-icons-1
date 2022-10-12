import { type ChangeEvent } from 'react'
import { Box } from '@components/Box/Box'
import styles from './Header.module.css'

type SvgConfigState = [string, (nextValue: string) => void]

type Props = {
	colorState: SvgConfigState
	strokeWidthState: SvgConfigState
	sizeState: SvgConfigState
}

export const Header = ({ colorState, strokeWidthState, sizeState }: Props) => {
	const [color, setColor] = colorState
	const [strokeWidth, setStrokeWidth] = strokeWidthState
	const [size, setSize] = sizeState

	const handleOnColorChange = (event: ChangeEvent<HTMLInputElement>) => {
		setColor(event.target.value)
	}

	const handleOnStrokeWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
		setStrokeWidth(event.target.value)
	}

	const handleOnSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSize(event.target.value)
	}

	return (
		<Box as="header" className={styles.header}>
			<label>
				<b>Stroke colour:</b> {color}
				<br />
				<input type="color" value={color} onChange={handleOnColorChange} />
			</label>

			<label>
				<b>Stroke width:</b> {strokeWidth}px
				<br />
				<input
					type="range"
					min="1"
					max="5"
					value={strokeWidth}
					onChange={handleOnStrokeWidthChange}
				/>
			</label>
			<label>
				<b>Size:</b> {size}x{size}px
				<br />
				<input
					type="range"
					min="12"
					max="48"
					step="6"
					value={size}
					onChange={handleOnSizeChange}
				/>
			</label>
		</Box>
	)
}
