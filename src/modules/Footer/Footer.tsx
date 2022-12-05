import { LogoHorizontal } from '@icons/LogoHorizontal'
import styles from './Footer.module.css'

export const Footer = () => (
	<footer className={styles.Footer}>
		<LogoHorizontal className={styles.logo} />
		<ul className={styles.list}>
			<li>© 2022 Web3 Foundation</li>
			<li>
				<a
					href="https://polkadot.network/impressum/"
					title="Impressum (opens in new tab)"
					target="_blank"
					rel="noreferrer"
				>
					Impressum
				</a>
			</li>
			<li>
				<a
					href="https://polkadot.network/privacy/"
					title="Privacy policy (opens in new tab)"
					target="_blank"
					rel="noreferrer"
				>
					Privacy
				</a>
			</li>
		</ul>
	</footer>
)
