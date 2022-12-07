import { Box } from '@components/Box/Box'
import { Button } from '@components/Button/Button'
import { Search as SearchIcon } from '@icons/Search'
import { useSearch } from '@hooks/useSearch'
import styles from './Search.module.css'
import { Close } from '@icons/Close'

export const Search = () => {
	const { inputRef, initialValue, totalCount, onSearch, onClear } = useSearch()

	return (
		<div className={styles.Search}>
			<Box>
				<form onSubmit={onSearch} action="/" method="get">
					<SearchIcon className={styles.searchIcon} />
					<input
						ref={inputRef}
						placeholder={`Search ${totalCount} icons`}
						type="search"
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
								height="19"
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
