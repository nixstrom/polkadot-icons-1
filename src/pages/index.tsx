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

				<meta property="og:type" content="website" />
				<meta property="og:url" content="/" />
				<meta property="og:title" content="Polkadot Icon Set | Brand Assets" />
				<meta
					property="og:image"
					content="https://icons.polkadot.network/Web3-Icon-Thumbnail.jpg"
				/>
				<meta property="og:site_name" content="Polkadot Icon Set" />
				<meta
					property="og:description"
					content="Browse and download a free comprehensive set of iconography for your Web3 projects."
				/>

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:url" content="/" />
				<meta name="twitter:title" content="Polkadot Icon Set | Brand Assets" />
				<meta name="twitter:site" content="Polkadot Icon Set" />
				<meta
					name="twitter:description"
					content="Browse and download a free comprehensive set of iconography for your Web3 projects."
				/>
				<meta
					name="twitter:image"
					content="https://icons.polkadot.network/Web3-Icon-Thumbnail.jpg"
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
