import { useContext, useEffect, useRef, type FormEvent } from 'react'
import { useRouter } from 'next/router'
import { context as SearchContext } from '@providers/SearchProvider'

// Matches file names of icons in /public/icons
const publicIcons = [
	'Archive Node',
	'Blockchain V2',
	'Boot Node',
	'Connection via light Node',
	'Decentralised Storage',
	'Deposit',
	'Glossary V1',
	'Layer',
	'Layer 1',
	'Layer 2',
	'Layer 3',
	'Layer 4',
	'Light Node',
	'Limited supply',
	'Node',
	'Not able to upgrade',
	'Oracle V1',
	'Proxy',
	'Referenda V1',
	'Remote Node',
	'Teleport',
	'Tools',
	'Upgrade',
	'Whitepaper',
	'Withdraw',
]

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
		icons: filteredIcons.icons,
	}
}
