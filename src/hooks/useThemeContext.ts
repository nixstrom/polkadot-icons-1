import { useContext, useEffect, useCallback } from 'react'
import {
	context as ThemeContext,
	type ThemeContext as ThemeContextType,
} from '@providers/ThemeProvider'

const getColorScheme = () =>
	typeof window !== 'undefined' &&
	window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'

export const useThemeContext = () => {
	const [state, setState] = useContext(ThemeContext)

	const setTheme = useCallback(
		(newTheme: ThemeContextType['theme']) => setState({ theme: newTheme }),
		[setState],
	)

	useEffect(() => {
		console.log('set color scheme', typeof window)
		setTheme(getColorScheme())
	}, [setTheme])

	return {
		theme: state.theme,
		setTheme,
	}
}
