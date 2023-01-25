import { useState, useEffect } from 'react'
import { Logo } from '@icons/Logo'
import Close from '@nixstrom/polkadot-icons/keyline/Close'
import { Button } from '@components/Button/Button'
import { NavigationLink } from '@components/NavigationLink/NavigationLink'
import styles from './TopBar.module.css'

const composeCssClasses = (isNavOpen: boolean) =>
	isNavOpen
		? {
				TopBarClasses: `${styles.TopBar} ${styles.TopBarNavOpen}`,
				navClasses: `${styles.nav} ${styles.navOpen}`,
				triggerClasses: `${styles.trigger} ${styles.triggerNavOpen}`,
				logoClasses: `${styles.logo} ${styles.logoNavOpen}`,
		  }
		: {
				TopBarClasses: styles.TopBar,
				navClasses: styles.nav,
				triggerClasses: styles.trigger,
				logoClasses: `${styles.logo} ${styles.logoNavClosed}`,
		  }

export const TopBar = () => {
	const [isNavOpen, setIsNavOpen] = useState(false)

	const { TopBarClasses, navClasses, triggerClasses, logoClasses } =
		composeCssClasses(isNavOpen)

	const handleOnOpenMenu = () => {
		setIsNavOpen(!isNavOpen)
	}

	useEffect(() => {
		if (isNavOpen) {
			document.body.classList.add('no-scroll')
		} else {
			document.body.classList.remove('no-scroll')
		}
	}, [isNavOpen])

	return (
		<section className={TopBarClasses}>
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
					<span className={styles.triggerClose}>
						<Close stroke="white" strokeWidth={3} />
					</span>
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
						title="Read license (opens in new tab)"
						href="https://polkadot.network/"
					>
						License
					</NavigationLink>
				</li>
				<li role="menuitem">
					<NavigationLink
						title="Share on Twitter (opens in new tab)"
						href="https://twitter.com/share?url=https://icons.polkadot.network/&text=This%20is%20the%20Polkadot%20Icon%20Set%20%E2%80%94%20A%20fully%20variable%20icon%20suite%20for%20the%20Polkadot%20community"
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
			</ul>
		</section>
	)
}
