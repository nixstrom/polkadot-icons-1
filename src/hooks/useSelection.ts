import { useContext, useCallback } from 'react'
import { context as SelectionContext } from '@providers/SelectionProvider'

export const useSelection = () => {
	const [selectedIcons, setSelectedIcons] = useContext(SelectionContext)

	const handleOnCheckToggle = (icon: string) => {
		if (selectedIcons.selected.includes(icon)) {
			console.log('uncheck')
			handleOnUncheck(icon)
		} else {
			console.log('check')
			setSelectedIcons(prevState => ({
				selected: [...prevState.selected, icon],
			}))
		}
	}

	const handleOnUncheck = useCallback(
		(icon: string) =>
			setSelectedIcons(prevState => ({
				selected: prevState.selected.filter(c => !(c === icon)),
			})),
		[setSelectedIcons],
	)

	return {
		handleOnCheckToggle,
		handleOnUncheck,
		selectedIcons: selectedIcons.selected,
	}
}
