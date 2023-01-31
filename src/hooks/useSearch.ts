import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import allIcons from '@nixstrom/polkadot-icons/solid'
import { getIconTitle } from '@translations/iconNames'
import { context as SearchContext } from '@providers/SearchProvider'

const publicIcons = [...Object.keys(allIcons)].sort((a, b) => {
	if (getIconTitle(a) > getIconTitle(b)) {
		return 1
	}

	if (getIconTitle(a) < getIconTitle(b)) {
		return -1
	}

	return 0
})

export const useSearch = () => {
	const [filteredIcons, setFilteredIcons] = useContext(SearchContext)
	const router = useRouter()
	const [query, setQuery] = useState(() => router.query.search || '')

	const onSearch = (newQuery: string) => {
		setQuery(newQuery)

		if (newQuery) {
			router.push(
				`/?search=${encodeURIComponent(newQuery.trim())}`,
				undefined,
				{ scroll: false },
			)
		} else {
			router.push('/', undefined, { scroll: false })
		}
	}

	const onClear = () => {
		if (query) {
			setQuery('')
			router.push('/', undefined, { scroll: false })
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
		initialValue: router.query.search,
		onSearch,
		query,
		onClear,
		icons: filteredIcons.icons,
		totalCount: publicIcons.length,
	}
}
