import { type ChangeEvent } from 'react'
import { Box } from '@components/Box/Box'
import { InputLabel } from '@components/InputLabel/InputLabel'
import { RangeInput } from '@components/RangeInput/RangeInput'
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

	return (
		<Box as="header" className={styles.header}>
			<InputLabel>
				<b>Stroke colour:</b>
				<input type="color" value={color} onChange={handleOnColorChange} />
				{color}
			</InputLabel>

			<InputLabel>
				<b>Stroke width:</b>
				<RangeInput
					min="1"
					max="2.5"
					step="0.5"
					value={strokeWidth}
					onChange={setStrokeWidth}
				/>
				{strokeWidth} px
			</InputLabel>
			<InputLabel>
				<b>Size:</b>
				<RangeInput
					min="12"
					max="48"
					step="6"
					value={size}
					onChange={setSize}
				/>
				{size}×{size} px
			</InputLabel>
		</Box>
	)
}
