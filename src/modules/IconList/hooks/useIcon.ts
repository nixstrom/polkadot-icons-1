import {
	useState,
	useEffect,
	useCallback,
	useRef,
	type MutableRefObject,
} from 'react'
import { useCustomisationContext } from '@hooks/useCustomisationContext'
import type { CustomisationContext as CustomisationContextType } from '@providers/CustomisationProvider'

type Props = {
	readonly containerRef: MutableRefObject<HTMLDivElement | null>
	readonly containerHasRef: boolean
}

type Status = 'loading' | 'error' | 'success'

const svgChildren = 'path, circle, rect'

export const useIcon = ({ containerRef, containerHasRef }: Props) => {
	const { strokeColor, strokeWidth, fillColor, cornerType, iconSize, style } =
		useCustomisationContext()
	const [svg] = useState<string>('')
	const [status] = useState<Status>('loading')
	const iconRef = useRef<SVGElement | null>(null)
	// used to determine if first-render effects should be ran
	const [hasRef, setHasRef] = useState(false)

	const changeStrokeColor = useCallback(
		(newColor: string) => {
			if (containerRef.current) {
				const paths = containerRef.current?.querySelectorAll(svgChildren) || []

				paths.forEach(p => {
					p.setAttribute('stroke', newColor)
				})
			}
		},
		[containerRef],
	)

	const changeFillColor = useCallback(
		(newColor: string) => {
			if (containerRef.current) {
				const paths = containerRef.current?.querySelectorAll(svgChildren) || []

				paths.forEach(p => {
					p.setAttribute('fill', newColor)
				})
			}
		},
		[containerRef],
	)

	const changeStrokeWidth = useCallback(
		(newStrokeWidth: string) => {
			if (containerRef.current) {
				const paths = containerRef.current?.querySelectorAll(svgChildren) || []

				paths.forEach(p => {
					p.setAttribute('stroke-width', newStrokeWidth)
				})
			}
		},
		[containerRef],
	)

	const changeCornerType = useCallback(
		(newCornerType: string) => {
			if (containerRef.current) {
				const paths = containerRef.current?.querySelectorAll(svgChildren) || []
				const [linecap, linejoin] =
					newCornerType === 'round'
						? ['round', 'round']
						: newCornerType === 'bevel'
						? ['square', 'bevel']
						: ['square', 'miter']

				paths.forEach(p => {
					p.setAttribute('stroke-linecap', linecap)
					p.setAttribute('stroke-linejoin', linejoin)
				})
			}
		},
		[containerRef],
	)

	const changeSize = useCallback(
		(newSize: string) => {
			const svgEl = containerRef.current?.querySelector('svg')
			if (svgEl) {
				svgEl.setAttribute('height', newSize)
				svgEl.setAttribute('width', newSize)
			}
		},
		[containerRef],
	)

	const changeStyle = useCallback(
		(newStyle: CustomisationContextType['style']) => {
			if (containerRef.current) {
				const paths = containerRef.current?.querySelectorAll(svgChildren) || []

				if (newStyle === 'solid') {
					paths.forEach(p => {
						p.setAttribute('fill', fillColor)
						p.setAttribute('stroke', 'none')
					})
				} else if (newStyle === 'line') {
					paths.forEach(p => {
						p.setAttribute('fill', 'none')
						p.setAttribute('stroke', strokeColor)
					})
				} else {
					paths.forEach(p => {
						p.setAttribute('fill', fillColor)
						p.setAttribute('stroke', strokeColor)
					})
				}
			}
		},
		[fillColor, strokeColor, containerRef],
	)

	useEffect(() => {
		changeStrokeColor(strokeColor)
	}, [containerHasRef, changeStrokeColor, strokeColor, hasRef, status])
	useEffect(
		() => changeStrokeWidth(strokeWidth),
		[containerHasRef, changeStrokeWidth, strokeWidth, hasRef],
	)
	useEffect(() => {
		changeFillColor(fillColor)
	}, [containerHasRef, changeFillColor, fillColor, hasRef, status])
	useEffect(
		() => changeCornerType(cornerType),
		[containerHasRef, changeCornerType, cornerType, hasRef],
	)
	useEffect(
		() => changeSize(iconSize),
		[containerHasRef, changeSize, iconSize, hasRef],
	)

	useEffect(
		() => changeStyle(style),
		[containerHasRef, style, changeStyle, hasRef],
	)

	useEffect(() => {
		if (containerHasRef && containerRef.current && !iconRef.current) {
			// eslint-disable-next-line functional/immutable-data
			iconRef.current = containerRef.current.children[0] as SVGElement
			setHasRef(true)
		}
	}, [containerRef, containerHasRef])

	return [svg, status]
}
