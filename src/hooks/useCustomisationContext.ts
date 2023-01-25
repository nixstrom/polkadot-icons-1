import { useContext, useEffect, useCallback } from 'react'
import {
	context as CustomisationContext,
	initialState,
	type CustomisationContext as CustomisationContextType,
} from '@providers/CustomisationProvider'
import type { ThemeContext as ThemeContextType } from '@providers/ThemeProvider'
import { useThemeContext } from '@hooks/useThemeContext'

export const useCustomisationContext = () => {
	const { theme } = useThemeContext()
	const [state, setState] = useContext(CustomisationContext)

	const setStrokeColor = useCallback(
		(newColor: CustomisationContextType['strokeColor']) => {
			setState(prevState => ({
				...prevState,
				strokeColor: newColor,
			}))
		},
		[setState],
	)

	const setStrokeWidth = (newWidth: CustomisationContextType['strokeWidth']) =>
		setState(prevState => ({ ...prevState, strokeWidth: newWidth }))

	const setCornerType = (
		newCornerType: CustomisationContextType['cornerType'],
	) => setState(prevState => ({ ...prevState, cornerType: newCornerType }))

	const setIconSize = (newSize: CustomisationContextType['iconSize']) =>
		setState(prevState => ({ ...prevState, iconSize: newSize }))

	const setStyle = (newStyle: CustomisationContextType['style']) =>
		setState(prevState => ({
			...prevState,
			cornerType: newStyle === 'solid' ? 'round' : prevState.cornerType,
			strokeWidth: newStyle === 'solid' ? '2' : prevState.strokeWidth,
			style: newStyle,
			fillColor:
				// default to two colours in 2-color mode (use brand colour)
				newStyle === '2 color' && prevState.fillColor === prevState.strokeColor
					? '#e6007a'
					: prevState.fillColor,
		}))

	const setFillColor = useCallback(
		(newColor: CustomisationContextType['fillColor']) =>
			setState(prevState => ({
				...prevState,
				fillColor: newColor,
			})),
		[setState],
	)

	// invert colours only if they don't match the theme
	const switchThemeColors = useCallback(
		(
			newTheme: ThemeContextType['theme'],
			stateKey: 'strokeColor' | 'fillColor',
		) => {
			if (newTheme === 'dark' && state[stateKey] === '#000000') {
				return '#ffffff'
			} else if (newTheme === 'light' && state[stateKey] === '#ffffff') {
				return '#000000'
			}

			return state[stateKey]
		},
		[state],
	)

	const reset = () => {
		setStrokeColor(theme === 'dark' ? '#ffffff' : '#000000')
		setFillColor(theme === 'dark' ? '#ffffff' : '#000000')
		setStrokeWidth(initialState.strokeWidth)
		setCornerType(initialState.cornerType)
		setIconSize(initialState.iconSize)
		setStyle(initialState.style)
	}

	useEffect(() => {
		setStrokeColor(switchThemeColors(theme, 'strokeColor'))
		setFillColor(switchThemeColors(theme, 'fillColor'))
	}, [setStrokeColor, setFillColor, switchThemeColors, theme])

	return {
		...state,
		setStrokeColor,
		setStrokeWidth,
		setCornerType,
		setFillColor,
		setIconSize,
		setStyle,
		reset,
	}
}
