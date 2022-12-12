import { useContext, useCallback } from 'react'
import {
	context as DownloadContext,
	type DownloadFormat,
} from '@providers/DownloadProvider'

export const useDownloadContext = () => {
	const [state, setState] = useContext(DownloadContext)

	const setFormats = useCallback(
		(format: DownloadFormat) =>
			setState(prevState => ({
				formats: { ...prevState.formats, [format]: !prevState.formats[format] },
			})),
		[setState],
	)

	return {
		formats: state.formats,
		setFormats,
	}
}
