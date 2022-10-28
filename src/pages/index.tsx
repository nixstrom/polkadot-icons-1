import Head from 'next/head'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { Button } from '@components/Button/Button'
import { Header } from '@modules/Header/Header'
import { IconList } from '@modules/IconList/IconList'
import { icons } from '@icons/icons'
import { useThemeContext } from '@hooks/useThemeContext'
import { useCustomisationContext } from '@hooks/useCustomisationContext'
import styles from '@styles/Home.module.css'

export default function Home() {
	const { theme } = useThemeContext()
	const { strokeColor, strokeWidth, iconSize } = useCustomisationContext()

	const handleOnDownload = () => {
		const zip = new JSZip()

		icons.forEach(file => {
			zip.file(`${file.name}.svg`, file.svg(strokeColor, strokeWidth, iconSize))
		})

		zip.generateAsync({ type: 'blob' }).then(function (content) {
			FileSaver.saveAs(content, 'polkadot-icons.zip')
		})
	}

	return (
		<div className={`${styles.container} ${styles[theme]}`}>
			<Head>
				<title>Polkadot Icons</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="preload"
					href="/Unbounded-Regular.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<link
					rel="preload"
					href="/Unbounded-Bold.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
			</Head>
			<main className={styles.main}>
				<Header />

				<IconList />

				<Button size="large" onClick={handleOnDownload}>
					Download all
				</Button>
			</main>
		</div>
	)
}
