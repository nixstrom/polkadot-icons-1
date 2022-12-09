import { useContext, useEffect, useCallback } from 'react'
import {
	context as CustomisationContext,
	initialState,
	type CustomisationContext as CustomisationContextType,
} from '@providers/CustomisationProvider'
import { useThemeContext } from '@hooks/useThemeContext'

export const useCustomisationContext = () => {
	const { theme } = useThemeContext()
	const [state, setState] = useContext(CustomisationContext)
	const { isInitialised } = state

	const setStrokeColor = useCallback(
		(newColor: CustomisationContextType['strokeColor']) => {
			setState(prevState => ({ ...prevState, strokeColor: newColor }))
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
		setState(prevState => ({ ...prevState, style: newStyle }))

	const setFillColor = useCallback(
		(newColor: CustomisationContextType['fillColor']) =>
			setState(prevState => ({ ...prevState, fillColor: newColor })),
		[setState],
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
		// prevent colour reset every time an icon mounts
		if (!isInitialised) {
			setStrokeColor(theme === 'dark' ? '#ffffff' : '#000000')
			setFillColor(theme === 'dark' ? '#ffffff' : '#000000')

			setState(prevState => ({ ...prevState, isInitialised: true }))
		}
	}, [setStrokeColor, setFillColor, setState, theme, isInitialised])

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
