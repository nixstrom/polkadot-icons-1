import Lottie from 'lottie-react'
import heroAnimation from '@lotties/hero.json'
import styles from './AnimatedHero.module.css'

export const AnimatedHero = () => (
	<div className={styles.AnimatedHero}>
		<h1 className={styles.text}>
			<span className={styles.firstLine}>Polkadot</span>
			<span className={styles.secondLine}>Icon set</span>
		</h1>
		<Lottie
			animationData={heroAnimation}
			className={styles.lottie}
			loop={false}
			aria-label="Polkadot Icons"
		/>
	</div>
)
