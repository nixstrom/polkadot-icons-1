import { Box } from '@components/Box/Box'
import { Button } from '@components/Button/Button'
import { Search as SearchIcon } from '@icons/Search'
import { useSearch } from '@hooks/useSearch'
import styles from './Search.module.css'

export const Search = () => {
	const { inputRef, initialValue, onSearch } = useSearch()

	return (
		<Box as="div" className={styles.wrapper}>
			<form onSubmit={onSearch} action="/" method="get">
				<SearchIcon className={styles.searchIcon} />
				<input
					ref={inputRef}
					placeholder="Search"
					type="search"
					className={styles.input}
					defaultValue={initialValue}
				/>
				<Button type="submit" className={styles.button} state="selected">
					Search
				</Button>
			</form>
		</Box>
	)
}
