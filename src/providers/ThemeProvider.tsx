import { createContext, Dispatch, SetStateAction, useState } from 'react'

export type ThemeContext = {
	readonly theme: 'light' | 'dark'
}

const initialState: ThemeContext = {
	theme: 'light',
}

type Noop = () => void

export const context = createContext<
	readonly [ThemeContext, Dispatch<SetStateAction<ThemeContext>> | Noop]
>([
	initialState,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	() => {},
])

export const ThemeProvider = ({
	children,
}: {
	readonly children: React.ReactElement | readonly React.ReactElement[]
}) => {
	const [state, setState] = useState<ThemeContext>(initialState)

	return (
		<context.Provider value={[state, setState]}>{children}</context.Provider>
	)
}
