import { createContext, Dispatch, SetStateAction, useState } from 'react'

type SelectionContext = {
	readonly selected: readonly string[]
}

const initialState: SelectionContext = {
	selected: [],
}

type Noop = () => void

export const context = createContext<
	readonly [SelectionContext, Dispatch<SetStateAction<SelectionContext>> | Noop]
>([
	initialState,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	() => {},
])

export const SelectionProvider = ({
	children,
}: {
	readonly children: React.ReactElement | readonly React.ReactElement[]
}) => {
	const [state, setState] = useState<SelectionContext>(initialState)

	return (
		<context.Provider value={[state, setState]}>{children}</context.Provider>
	)
}
