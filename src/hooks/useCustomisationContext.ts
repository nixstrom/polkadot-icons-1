import { useContext } from 'react'
import {
	context as CustomisationContext,
	type CustomisationContext as CustomisationContextType,
} from '@providers/CustomisationProvider'

export const useCustomisationContext = () => {
	const [state, setState] = useContext(CustomisationContext)

	const setStrokeColor = (newColor: CustomisationContextType['strokeColor']) =>
		setState(prevState => ({ ...prevState, strokeColor: newColor }))

	const setStrokeWidth = (newWidth: CustomisationContextType['strokeWidth']) =>
		setState(prevState => ({ ...prevState, strokeWidth: newWidth }))

	const setIconSize = (newSize: CustomisationContextType['iconSize']) =>
		setState(prevState => ({ ...prevState, iconSize: newSize }))

	return { ...state, setStrokeColor, setStrokeWidth, setIconSize }
}
