import Lottie from 'lottie-react'
import heroAnimation from '@lotties/hero.json'
import styles from './AnimatedHero.module.css'

export const AnimatedHero = () => (
	<div className={styles.AnimatedHero}>
		<Lottie
			animationData={heroAnimation}
			className={styles.lottie}
			loop={false}
			aria-label="Polkadot Icons"
		/>
	</div>
)
