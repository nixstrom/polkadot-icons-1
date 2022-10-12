import styles from './Box.module.css'

type As<Props = any> = React.ElementType<Props>

type Props = {
	as?: As
	className: string
	children: React.ReactNode | React.ReactNode[]
}

export const Box = ({ as: Components = 'div', className, children }: Props) => {
	return (
		<Components className={`${styles.box} ${className}`}>{children}</Components>
	)
}

// const MyComponent: React.FunctionComponent<CompProps & React.HTMLAttributes<HTMLOrSVGElement>> = ({
//   tag: Wrapper = "div",
//   children,
//   ...rest
// }) => {
//   return <Wrapper {...rest}>{children}</Wrapper>;
// };
