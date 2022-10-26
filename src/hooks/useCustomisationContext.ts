import { useContext, useState, useEffect, useCallback } from 'react'
import {
	context as CustomisationContext,
	type CustomisationContext as CustomisationContextType,
} from '@providers/CustomisationProvider'

const getColorScheme = () =>
	typeof window !== 'undefined' &&
	window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'

export const useCustomisationContext = () => {
	const [state, setState] = useContext(CustomisationContext)
	const [hasConfiguredTheme, setHasConfiguredTheme] = useState(false)

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

	const setFillColor = (newColor: CustomisationContextType['fillColor']) =>
		setState(prevState => ({ ...prevState, fillColor: newColor }))

	useEffect(() => {
		if (!hasConfiguredTheme) {
			// prevents hydration error when in light mode
			setStrokeColor(getColorScheme() === 'dark' ? '#ffffff' : '#000000')

			setHasConfiguredTheme(true)
		}
	}, [setStrokeColor, hasConfiguredTheme])

	return {
		...state,
		setStrokeColor,
		setStrokeWidth,
		setCornerType,
		setFillColor,
		setIconSize,
		setStyle,
	}
}
