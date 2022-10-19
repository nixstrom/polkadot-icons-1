import { useState, useEffect, useRef, type MutableRefObject } from 'react'

type Props = {
	readonly color: string
	readonly strokeWidth: string
	readonly size: string
	readonly icon: string
	readonly containerRef: MutableRefObject<HTMLDivElement | null>
	readonly containerHasRef: boolean
}

type Status = 'idle' | 'loading' | 'error' | 'success'

export const useIcon = ({
	color,
	strokeWidth,
	size,
	icon,
	containerRef,
	containerHasRef,
}: Props) => {
	const [svg, setSvg] = useState<string>('')
	const [status, setStatus] = useState<Status>('idle')
	const iconRef = useRef<SVGElement | null>(null)
	// used to determine if first-render effects should be ran
	const [hasRef, setHasRef] = useState(false)

	useEffect(() => {
		setStatus('loading')

		fetch(`/icons/${icon}.svg`)
			.then(res => res.text())
			.then(setSvg)
			.catch(() => setStatus('error'))
			.then(() => setStatus('success'))
	}, [icon])

	const changeStrokeColor = (newColor: string) => {
		if (iconRef.current) {
			const paths = iconRef.current?.querySelectorAll('path') || []

			paths.forEach(p => {
				p.setAttribute('stroke', newColor)
			})
		}
	}

	const changeStrokeWidth = (newStrokeWidth: string) => {
		if (iconRef.current) {
			const paths = iconRef.current?.querySelectorAll('path') || []

			paths.forEach(p => {
				p.setAttribute('stroke-width', newStrokeWidth)
			})
		}
	}

	const changeSize = (newSize: string) => {
		if (iconRef.current) {
			iconRef.current.setAttribute('height', newSize)
			iconRef.current.setAttribute('width', newSize)
		}
	}

	useEffect(() => {
		changeStrokeColor(color)
	}, [containerHasRef, color, hasRef])
	useEffect(
		() => changeStrokeWidth(strokeWidth),
		[containerHasRef, strokeWidth, hasRef],
	)
	useEffect(() => changeSize(size), [containerHasRef, size, hasRef])

	useEffect(() => {
		if (iconRef.current) {
			const shapes = iconRef.current?.querySelectorAll('rect, circ') || []

			shapes.forEach(shape => {
				shape.setAttribute('fill', 'transparent')
			})
		}
	}, [color, strokeWidth, size, hasRef])

	useEffect(() => {
		if (containerHasRef && containerRef.current && !iconRef.current) {
			// eslint-disable-next-line functional/immutable-data
			iconRef.current = containerRef.current.children[0] as SVGElement
			setHasRef(true)
		}
	}, [containerRef, containerHasRef])

	return [svg, status]
}
