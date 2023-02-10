import Head from 'next/head'
import { TopBar } from '@modules/TopBar/TopBar'
import { Search } from '@modules/Search/Search'
import { Header } from '@modules/Header/Header'
import { AnimatedHero } from '@modules/AnimatedHero/AnimatedHero'
import { IconList } from '@modules/IconList/IconList'
import { DownloadActions } from '@modules/DownloadActions/DownloadActions'
import { Footer } from '@modules/Footer/Footer'
import { useThemeContext } from '@hooks/useThemeContext'
import styles from '@styles/Home.module.css'

export default function Home() {
	const { theme } = useThemeContext()

	return (
		<div
			className={`${styles.container} ${styles[theme]}`}
			style={{ fontFamily: 'Unbounded' }}
		>
			<Head>
				<title>Polkadot Icon Set | Brand Assets</title>
				<meta
					name="description"
					content="Browse and download a free comprehensive set of iconography for your Web3 projects."
				/>
				<link rel="icon" href="/favicon.svg" />
				<link
					rel="preload"
					href="/Unbounded-ExtraLight.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
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
			<TopBar />
			<AnimatedHero />
			<main className={styles.main}>
				<Search />
				<Header />

				<section className={styles.content}>
					<IconList />

					<DownloadActions />
				</section>
			</main>

			<Footer />
		</div>
	)
}
