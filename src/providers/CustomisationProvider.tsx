import { createContext, Dispatch, SetStateAction, useState } from 'react'

export type CustomisationContext = {
	readonly strokeColor: string
	readonly strokeWidth: string
	readonly iconSize: string
}

const initialState: CustomisationContext = {
	strokeColor: '#ffffff',
	strokeWidth: '2',
	iconSize: '24',
}

type Noop = () => void

export const context = createContext<
	readonly [
		CustomisationContext,
		Dispatch<SetStateAction<CustomisationContext>> | Noop,
	]
>([
	initialState,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	() => {},
])

export const CustomisationProvider = ({
	children,
}: {
	readonly children: React.ReactElement | readonly React.ReactElement[]
}) => {
	const [state, setState] = useState<CustomisationContext>(initialState)

	return (
		<context.Provider value={[state, setState]}>{children}</context.Provider>
	)
}
