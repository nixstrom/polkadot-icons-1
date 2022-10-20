import { useContext, useState, useEffect } from 'react'
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

	const setStrokeColor = (newColor: CustomisationContextType['strokeColor']) =>
		setState(prevState => ({ ...prevState, strokeColor: newColor }))

	const setStrokeWidth = (newWidth: CustomisationContextType['strokeWidth']) =>
		setState(prevState => ({ ...prevState, strokeWidth: newWidth }))

	const setIconSize = (newSize: CustomisationContextType['iconSize']) =>
		setState(prevState => ({ ...prevState, iconSize: newSize }))

	useEffect(() => {
		if (!hasConfiguredTheme) {
			// prevents hydration error when in light mode
			setStrokeColor(getColorScheme() === 'dark' ? '#ffffff' : '#000000')

			setHasConfiguredTheme(true)
		}
	}, [setStrokeColor, hasConfiguredTheme])

	return { ...state, setStrokeColor, setStrokeWidth, setIconSize }
}
