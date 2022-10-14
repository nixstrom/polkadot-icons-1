import { Box } from '@components/Box/Box'
import { InputLabel } from '@components/InputLabel/InputLabel'
import { ColorInput } from '@components/ColorInput/ColorInput'
import { RangeInput } from '@components/RangeInput/RangeInput'
import styles from './Header.module.css'

type SvgConfigState = readonly [string, (nextValue: string) => void]

type Props = {
	readonly colorState: SvgConfigState
	readonly strokeWidthState: SvgConfigState
	readonly sizeState: SvgConfigState
}

export const Header = ({ colorState, strokeWidthState, sizeState }: Props) => {
	const [color, setColor] = colorState
	const [strokeWidth, setStrokeWidth] = strokeWidthState
	const [size, setSize] = sizeState

	return (
		<Box as="header" className={styles.header}>
			<InputLabel>
				<b>Stroke colour:</b>
				<ColorInput value={color} onChange={setColor} />
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
				<span className={styles.strokeWidthValue}>{strokeWidth} px</span>
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
				<span className={styles.sizeWidthValue}>
					{size}×{size} px
				</span>
			</InputLabel>
		</Box>
	)
}
