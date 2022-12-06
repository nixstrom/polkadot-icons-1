import { useContext, useEffect, useRef, type FormEvent } from 'react'
import { useRouter } from 'next/router'
import allIcons from 'polkadot-icon-package'
import { context as SearchContext } from '@providers/SearchProvider'

// Matches file names of icons in /public/icons
const publicIcons = Object.keys(allIcons)

export const useSearch = () => {
	const [filteredIcons, setFilteredIcons] = useContext(SearchContext)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const router = useRouter()

	const onSearch = (event: FormEvent) => {
		event.preventDefault()

		if (inputRef.current?.value) {
			router.push(
				`/?search=${encodeURIComponent(inputRef.current.value.trim())}`,
			)
		} else {
			router.push('/')
		}
	}

	const onClear = () => {
		if (inputRef.current?.value) {
			// eslint-disable-next-line functional/immutable-data
			inputRef.current.value = ''
		}
	}

	useEffect(() => {
		if (typeof router.query.search === 'string') {
			const icons = publicIcons.filter(icon =>
				icon.toLowerCase().includes(String(router.query.search).toLowerCase()),
			)

			setFilteredIcons({ icons })
		} else {
			setFilteredIcons({ icons: publicIcons })
		}
	}, [router.query.search, setFilteredIcons])

	return {
		inputRef,
		initialValue: router.query.search,
		onSearch,
		onClear,
		icons: filteredIcons.icons,
	}
}
