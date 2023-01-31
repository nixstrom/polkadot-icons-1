import type { KeyboardEvent, ChangeEvent } from 'react'
import SearchIcon from '@nixstrom/polkadot-icons/keyline/Search'
import Close from '@nixstrom/polkadot-icons/keyline/Close'
import { Box } from '@components/Box/Box'
import { useSearch } from '@hooks/useSearch'
import styles from './Search.module.css'

export const Search = () => {
	const { initialValue, totalCount, query, onSearch, onClear } = useSearch()

	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		onSearch(event.target.value)
	}

	const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		// prevent clear button being pressed when pressing enter
		if (event.key === 'Enter') {
			event.preventDefault()
		}
	}

	const inputProps = query
		? {
				value: query,
		  }
		: {
				defaultValue: initialValue,
		  }

	return (
		<div className={styles.Search}>
			<Box>
				<form onSubmit={e => e.preventDefault()} action="/" method="get">
					<SearchIcon
						aria-hidden
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						className={styles.searchIcon}
					/>
					<input
						placeholder={`Search ${totalCount} icons`}
						type="search"
						onChange={handleOnChange}
						onKeyDown={handleOnKeyDown}
						className={styles.input}
						{...inputProps}
					/>
					{!!query && (
						<button
							className={styles.clear}
							aria-label="Clear search"
							onClick={onClear}
						>
							<Close
								aria-hidden
								height="22"
								width="10"
								strokeWidth={2}
								strokeLinecap="round"
								className={styles.clearIcon}
							/>
						</button>
					)}
				</form>
			</Box>
		</div>
	)
}
