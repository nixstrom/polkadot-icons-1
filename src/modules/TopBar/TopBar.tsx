import { useState } from 'react'
import { Logo } from '@icons/Logo'
import { Button } from '@components/Button/Button'
import { NavigationLink } from '@components/NavigationLink/NavigationLink'
import styles from './TopBar.module.css'

export const TopBar = () => {
	const [isNavOpen, setIsNavOpen] = useState(false)

	const navClasses = isNavOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav
	const logoClasses = isNavOpen
		? `${styles.logo} ${styles.logoNavOpen}`
		: `${styles.logo} ${styles.logoNavClosed}`
	const triggerClasses = isNavOpen
		? `${styles.trigger} ${styles.triggerNavOpen}`
		: styles.trigger

	const handleOnOpenMenu = () => {
		setIsNavOpen(!isNavOpen)
	}

	return (
		<section className={styles.TopBar}>
			<Logo className={logoClasses} aria-label="Polkadot logo" />

			<Button
				id="menu-button"
				size="large"
				color="transparent"
				onClick={handleOnOpenMenu}
				className={triggerClasses}
				aria-label={isNavOpen ? 'Close menu' : 'Open menu'}
				aria-controls={isNavOpen ? 'nav-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={isNavOpen ? 'true' : undefined}
			>
				<span className={styles.triggerInner} aria-hidden>
					<span className={styles.triggerOpen}>Menu</span>
					<span className={styles.triggerClose}>Close</span>
				</span>
			</Button>

			<ul
				className={navClasses}
				id="nav-menu"
				role="menu"
				aria-labelledby="menu-button"
			>
				<li role="menuitem">
					<NavigationLink
						title="Share on Twitter (opens in new tab)"
						href="https://twitter.com/share?url=https://unbounded.polkadot.network/&text=This%20is%20Unbounded%20%E2%80%94%20A%20Polkadot%20Typeface"
					>
						Share
					</NavigationLink>
				</li>
				<li role="menuitem">
					<NavigationLink
						title="See code on Github (opens in new tab)"
						href="https://polkadot.network/"
					>
						Github
					</NavigationLink>
				</li>
				<li role="menuitem">
					<NavigationLink
						title="Download Figma plugin (opens in new tab)"
						href="https://polkadot.network/"
					>
						Figma plugin
					</NavigationLink>
				</li>
			</ul>
		</section>
	)
}
