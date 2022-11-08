import { Box } from '@components/Box/Box'
import { Button } from '@components/Button/Button'
import { Search as SearchIcon } from '@icons/Search'
import styles from './Search.module.css'

export const Search = () => {
	return (
		<Box as="div" className={styles.wrapper}>
			<SearchIcon className={styles.searchIcon} />
			<input placeholder="Search" type="search" className={styles.input} />
			<Button className={styles.button} state="selected">
				Search
			</Button>
		</Box>
	)
}
