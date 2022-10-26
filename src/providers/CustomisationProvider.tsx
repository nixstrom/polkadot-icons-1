import { createContext, Dispatch, SetStateAction, useState } from 'react'

export type CustomisationContext = {
	readonly strokeColor: string
	readonly strokeWidth: string
	readonly fillColor: string
	readonly iconSize: string
	readonly cornerType: 'round' | 'square'
	readonly style: 'keyline' | 'solid' | '2 color'
}

const initialState: CustomisationContext = {
	strokeColor: '#ffffff',
	strokeWidth: '2',
	fillColor: '#ffffff',
	iconSize: '24',
	cornerType: 'round',
	style: 'keyline',
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
