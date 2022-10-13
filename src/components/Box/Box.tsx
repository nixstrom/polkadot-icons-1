import styles from './Box.module.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type As<Props = any> = React.ElementType<Props>

type Props = {
	readonly as?: As
	readonly className?: string
	readonly children: React.ReactNode | readonly React.ReactNode[]
}

export const Box = ({ as: Components = 'div', className, children }: Props) => (
	<Components className={`${styles.box} ${className}`}>{children}</Components>
)
