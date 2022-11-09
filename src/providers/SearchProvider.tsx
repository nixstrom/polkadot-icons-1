import { createContext, Dispatch, SetStateAction, useState } from 'react'

type SearchContext = {
	readonly icons: readonly string[]
}

const initialState: SearchContext = {
	icons: [],
}

type Noop = () => void

export const context = createContext<
	readonly [SearchContext, Dispatch<SetStateAction<SearchContext>> | Noop]
>([
	initialState,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	() => {},
])

export const SearchProvider = ({
	children,
}: {
	readonly children: React.ReactElement | readonly React.ReactElement[]
}) => {
	const [state, setState] = useState<SearchContext>(initialState)

	return (
		<context.Provider value={[state, setState]}>{children}</context.Provider>
	)
}
