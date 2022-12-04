import type { SVGProps } from 'react'

const defaultProps: SVGProps<SVGSVGElement> = {
	xmlns: 'http://www.w3.org/2000/svg',
	width: '16',
	height: '17',
	viewBox: ' 0 0 16 17',
	fill: 'none',
}

export const Close = ({ ...props }: SVGProps<SVGSVGElement>) => (
	<svg {...defaultProps} {...props}>
		<path
			d="m9.40478 8.47417 6.43972-6.43973-1.2627-1.262686-6.43971 6.439726-6.43972-6.439726-1.262693 1.262686 6.439723 6.43973-6.439723 6.43973 1.262693 1.2627 6.43972-6.43974 6.43971 6.43974 1.2627-1.2627z"
			fill="currentColor"
		/>
	</svg>
)
