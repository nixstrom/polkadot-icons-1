import { useRouter } from 'next/router'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { Button } from '@components/Button/Button'
import { useSearch } from '@hooks/useSearch'
import { useSelection } from '@hooks/useSelection'
import styles from './DownloadActions.module.css'

const composeDownloadButtonText = (
	selectedCount: number,
	hasSearch: boolean,
	filteredCount: number,
) => {
	if (selectedCount) {
		return `Download selection (${selectedCount})`
	} else if (hasSearch && filteredCount) {
		return `Download (${filteredCount})`
	}

	return 'Download all'
}

export const DownloadActions = () => {
	const router = useRouter()
	const { icons: filteredIcons } = useSearch()
	const { selectedIcons, handleOnClear } = useSelection()

	const handleOnDownload = () => {
		if (filteredIcons.length) {
			const zip = new JSZip()

			const iconsToDownload = selectedIcons.length
				? selectedIcons
				: filteredIcons

			iconsToDownload.forEach(icon => {
				const node = document.querySelector(
					`div[data-download-name="${icon}"] svg`,
				)

				if (node) {
					zip.file(`${icon}.svg`, node.outerHTML)
				}
			})

			zip.generateAsync({ type: 'blob' }).then(function (content) {
				FileSaver.saveAs(content, 'polkadot-icons.zip')
			})
		}
	}

	const downloadButtonText = composeDownloadButtonText(
		selectedIcons.length,
		typeof router.query.search === 'string',
		filteredIcons.length,
	)

	const downloadButtonClasses = filteredIcons.length
		? styles.download
		: `${styles.download} ${styles.hide}`

	const clearButtonClasses = selectedIcons.length
		? styles.clear
		: `${styles.clear} ${styles.hide}`

	return (
		<footer className={styles.DownloadActions}>
			<div className={styles.middleCol}>
				<Button
					className={downloadButtonClasses}
					size="large"
					state="selected"
					onClick={handleOnDownload}
				>
					{downloadButtonText}
				</Button>
			</div>
			<div className={styles.endCol}>
				<Button
					className={clearButtonClasses}
					size="large"
					onClick={handleOnClear}
				>
					Clear selection
				</Button>
			</div>
		</footer>
	)
}
