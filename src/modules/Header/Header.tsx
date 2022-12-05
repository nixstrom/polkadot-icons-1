import { Box } from '@components/Box/Box'
import { InputLabel } from '@components/InputLabel/InputLabel'
import { ColorInput } from '@components/ColorInput/ColorInput'
import { RangeInput } from '@components/RangeInput/RangeInput'
import { RadioButtonGroup } from '@components/RadioButtonGroup/RadioButtonGroup'
import { Select } from '@components/Select/Select'
import { useThemeContext } from '@hooks/useThemeContext'
import { useCustomisationContext } from '@hooks/useCustomisationContext'
import type { ThemeContext as ThemeContextType } from '@providers/ThemeProvider'
import type { CustomisationContext as CustomisationContextType } from '@providers/CustomisationProvider'
import styles from './Header.module.css'

export const Header = () => {
	const { theme, setTheme } = useThemeContext()
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
		reset,
	} = useCustomisationContext()

	return (
		<header className={styles.Header}>
			<Box className={styles.box}>
				<h2 className={styles.title}>Customize</h2>

				<div className={styles.resetContainer}>
					<button className={styles.reset} onClick={reset}>
						Reset
					</button>
				</div>

				<RadioButtonGroup<CustomisationContextType['style']>
					label="Style"
					value={style}
					options={['keyline', 'solid', '2 color']}
					className={styles.styleModule}
					onChange={setStyle}
				/>

				{style !== 'solid' && (
					<InputLabel className={styles.strokeColorModule}>
						<b>Line color</b>
						<ColorInput value={strokeColor} onChange={setStrokeColor} />
					</InputLabel>
				)}

				{style !== 'keyline' && (
					<InputLabel className={styles.fillColorModule}>
						<b>Fill color</b>
						<ColorInput value={fillColor} onChange={setFillColor} />
					</InputLabel>
				)}

				{style !== '2 color' && <div className={styles.dummyContainer} />}

				<InputLabel className={styles.strokeWidthModule}>
					<b>Stroke</b>
					<div className={styles.rangeInputWrapper}>
						<RangeInput
							min="1"
							max="2.5"
							step="0.5"
							value={strokeWidth}
							onChange={setStrokeWidth}
						/>
						<span className={styles.strokeWidthValue}>{strokeWidth} px</span>
					</div>
				</InputLabel>

				<InputLabel className={styles.sizeModule}>
					<b>Size</b>
					<div className={styles.rangeInputWrapper}>
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
					</div>
				</InputLabel>

				<InputLabel className={styles.cornerTypeModule}>
					<b>Corner</b>
					<Select
						value={cornerType}
						options={['round', 'square']}
						onChange={setCornerType}
					/>
				</InputLabel>

				<RadioButtonGroup<ThemeContextType['theme']>
					label="Mode"
					value={theme}
					options={['light', 'dark']}
					className={styles.themeModule}
					onChange={setTheme}
				/>
			</Box>
		</header>
	)
}
