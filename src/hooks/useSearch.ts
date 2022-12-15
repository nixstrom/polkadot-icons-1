import { useContext, useEffect, useRef, type FormEvent } from 'react'
import { useRouter } from 'next/router'
import allIcons from '@nixstrom/polkadot-icons'
import { getIconTitle } from '@translations/iconNames'
import { context as SearchContext } from '@providers/SearchProvider'

const publicIcons = [...Object.keys(allIcons)].sort()

export const useSearch = () => {
	const [filteredIcons, setFilteredIcons] = useContext(SearchContext)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const router = useRouter()

	const onSearch = (event: FormEvent) => {
		event.preventDefault()

		if (inputRef.current?.value) {
			router.push(
				`/?search=${encodeURIComponent(inputRef.current.value.trim())}`,
				undefined,
				{ scroll: false },
			)
		} else {
			router.push('/', undefined, { scroll: false })
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
				getIconTitle(icon)
					.toLowerCase()
					.replaceAll('[^A-Za-z0-9]', '')
					.includes(
						String(router.query.search)
							.toLowerCase()
							.replaceAll('[^A-Za-z0-9]', ''),
					),
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
		totalCount: publicIcons.length,
	}
}
