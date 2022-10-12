import styles from './Box.module.css'

type As<Props = any> = React.ElementType<Props>

type Props = {
	as?: As
	className?: string
	children: React.ReactNode | React.ReactNode[]
}

export const Box = ({ as: Components = 'div', className, children }: Props) => (
	<Components className={`${styles.box} ${className}`}>{children}</Components>
)
