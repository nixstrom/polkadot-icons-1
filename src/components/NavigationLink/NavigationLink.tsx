import styles from './NavigationLink.module.css'

type Props = {
	readonly href: string
	readonly title?: string
	readonly children: string
}

export const NavigationLink = ({ href, title, children }: Props) => (
	<a
		href={href}
		title={title}
		className={styles.NavigationLink}
		target="_blank"
		rel="noreferrer"
	>
		{children}
	</a>
)
