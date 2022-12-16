import { useRouter } from 'next/router'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { Button } from '@components/Button/Button'
import { useSearch } from '@hooks/useSearch'
import { useSelection } from '@hooks/useSelection'
import { useDownloadContext } from '@hooks/useDownloadContext'
import { getIconTitle } from '@translations/iconNames'
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

const downloadZip = (zip: JSZip) => {
	setTimeout(() => {
		zip.generateAsync({ type: 'blob' }).then(function (content) {
			FileSaver.saveAs(content, 'polkadot-icons.zip')
		})
	}, 100)
}

const addPngToZip = async (
	iconName: string,
	svgNode: Element | null,
	zip: JSZip,
) => {
	const canvas = document.getElementById(
		`canvas-${iconName}`,
	) as HTMLCanvasElement

	if (canvas && svgNode) {
		const ctx = canvas.getContext('2d')
		const DOMURL = window.URL || window.webkitURL || window

		const img = new Image()

		const svgBlob = new Blob([svgNode.outerHTML], {
			type: 'image/svg+xml;charset=utf-8',
		})
		const url = DOMURL.createObjectURL(svgBlob)

		if (ctx) {
			ctx.drawImage(img, 0, 0)
			//eslint-disable-next-line functional/immutable-data
			img.onload = async function () {
				ctx.drawImage(img, 0, 0)

				await canvas.toBlob(function (blob) {
					blob &&
						zip.file(`${getIconTitle(iconName).replaceAll('/', '_')}.png`, blob)
				})

				// clean canvas to prevent double icons
				ctx.clearRect(0, 0, canvas.width, canvas.height)
				ctx.beginPath()
			}

			//eslint-disable-next-line functional/immutable-data
			img.src = url
		}
	}
}

export const DownloadActions = () => {
	const router = useRouter()
	const { icons: filteredIcons } = useSearch()
	const { formats } = useDownloadContext()
	const { selectedIcons, handleOnClear } = useSelection()

	const handleOnDownload = async () => {
		if (filteredIcons.length) {
			const zip = new JSZip()

			const iconsToDownload = selectedIcons.length
				? selectedIcons
				: filteredIcons

			// eslint-disable-next-line functional/no-loop-statement
			for await (const icon of iconsToDownload) {
				const node = document.querySelector(
					`div[data-download-name="${icon}"] svg`,
				)

				if (formats.svg && node) {
					zip.file(
						`${getIconTitle(icon).replaceAll('/', '_')}.svg`,
						node.outerHTML,
					)
				}

				if (formats.png) {
					await addPngToZip(icon, node, zip)
				}
			}

			downloadZip(zip)
		}
	}

	const downloadButtonText = composeDownloadButtonText(
		selectedIcons.length,
		typeof router.query.search === 'string',
		filteredIcons.length,
	)

	const downloadButtonClasses =
		filteredIcons.length && (formats.png || formats.svg)
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
