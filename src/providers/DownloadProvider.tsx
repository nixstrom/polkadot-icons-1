import { createContext, Dispatch, SetStateAction, useState } from 'react'

export type DownloadFormat = 'svg' | 'png'

export type DownloadContext = {
	readonly formats: Record<DownloadFormat, boolean>
}

const initialState: DownloadContext = {
	formats: {
		svg: true,
		png: false,
	},
}

type Noop = () => void

export const context = createContext<
	readonly [DownloadContext, Dispatch<SetStateAction<DownloadContext>> | Noop]
>([
	initialState,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	() => {},
])

export const DownloadProvider = ({
	children,
}: {
	readonly children: React.ReactElement | readonly React.ReactElement[]
}) => {
	const [state, setState] = useState<DownloadContext>(initialState)

	return (
		<context.Provider value={[state, setState]}>{children}</context.Provider>
	)
}
