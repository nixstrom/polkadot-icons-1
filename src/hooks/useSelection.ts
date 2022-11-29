import { useContext, useCallback } from 'react'
import { context as SelectionContext } from '@providers/SelectionProvider'

export const useSelection = () => {
	const [selectedIcons, setSelectedIcons] = useContext(SelectionContext)

	const handleOnCheckToggle = (icon: string) => {
		if (selectedIcons.selected.includes(icon)) {
			handleOnUncheck(icon)
		} else {
			setSelectedIcons(prevState => ({
				selected: [...prevState.selected, icon],
			}))
		}
	}

	const handleOnClear = () => {
		setSelectedIcons({
			selected: [],
		})
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
		handleOnClear,
		selectedIcons: selectedIcons.selected,
	}
}
