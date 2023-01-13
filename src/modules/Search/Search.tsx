import type { KeyboardEvent } from 'react'
import SearchIcon from '@nixstrom/polkadot-icons/keyline/Search'
import { Box } from '@components/Box/Box'
import { Button } from '@components/Button/Button'
import { useSearch } from '@hooks/useSearch'
import styles from './Search.module.css'
import { Close } from '@icons/Close'

export const Search = () => {
	const { inputRef, initialValue, totalCount, onSearch, onClear } = useSearch()

	const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		// prevent clear button being pressed when pressing enter
		if (event.key === 'Enter') {
			event.preventDefault()
			onSearch(event)
		}
	}

	return (
		<div className={styles.Search}>
			<Box>
				<form onSubmit={onSearch} action="/" method="get">
					<SearchIcon aria-hidden className={styles.searchIcon} />
					<input
						ref={inputRef}
						placeholder={`Search ${totalCount} icons`}
						type="search"
						onKeyDown={handleOnKeyDown}
						className={styles.input}
						defaultValue={initialValue}
					/>
					{!!inputRef.current?.value && (
						<button
							className={styles.clear}
							aria-label="Clear search"
							onClick={onClear}
						>
							<Close
								aria-hidden
								height="22"
								width="10"
								className={styles.clearIcon}
							/>
						</button>
					)}
					<Button type="submit" className={styles.button} state="selected">
						Search
					</Button>
				</form>
			</Box>
		</div>
	)
}
