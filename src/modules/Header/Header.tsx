import { Box } from '@components/Box/Box'
import { InputLabel } from '@components/InputLabel/InputLabel'
import { ColorInput } from '@components/ColorInput/ColorInput'
import { RangeInput } from '@components/RangeInput/RangeInput'
import { RadioButtonGroup } from '@components/RadioButtonGroup/RadioButtonGroup'
import { Select } from '@components/Select/Select'
import { useCustomisationContext } from '@hooks/useCustomisationContext'
import styles from './Header.module.css'

export const Header = () => {
	const {
		strokeColor,
		setStrokeColor,
		strokeWidth,
		setStrokeWidth,
		cornerType,
		setCornerType,
		iconSize,
		setIconSize,
		style,
		setStyle,
		fillColor,
		setFillColor,
	} = useCustomisationContext()

	return (
		<Box as="header" className={styles.header}>
			<RadioButtonGroup
				label="Style"
				value={style}
				options={['keyline', 'solid', '2 color']}
				onChange={setStyle}
			/>

			<InputLabel>
				<b>Corner:</b>
				<Select
					value={cornerType}
					options={['round', 'square']}
					onChange={setCornerType}
				/>
			</InputLabel>

			{style !== 'solid' && (
				<InputLabel>
					<b>Stroke colour:</b>
					<ColorInput value={strokeColor} onChange={setStrokeColor} />
				</InputLabel>
			)}

			{style !== 'keyline' && (
				<InputLabel>
					<b>Fill colour:</b>
					<ColorInput value={fillColor} onChange={setFillColor} />
				</InputLabel>
			)}

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
					value={iconSize}
					onChange={setIconSize}
				/>
				<span className={styles.sizeWidthValue}>
					{iconSize}×{iconSize} px
				</span>
			</InputLabel>
		</Box>
	)
}
