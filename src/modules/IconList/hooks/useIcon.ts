import { useState, useEffect, useRef, type MutableRefObject } from 'react'
import { useCustomisationContext } from '@hooks/useCustomisationContext'

type Props = {
	readonly iconName: string
	readonly containerRef: MutableRefObject<HTMLDivElement | null>
	readonly containerHasRef: boolean
}

type Status = 'loading' | 'error' | 'success'

export const useIcon = ({ iconName, containerRef, containerHasRef }: Props) => {
	const { strokeColor, strokeWidth, iconSize } = useCustomisationContext()
	const [svg, setSvg] = useState<string>('')
	const [status, setStatus] = useState<Status>('loading')
	const iconRef = useRef<SVGElement | null>(null)
	// used to determine if first-render effects should be ran
	const [hasRef, setHasRef] = useState(false)

	useEffect(() => {
		fetch(`/icons/${iconName}.svg`)
			.then(res => res.text())
			.then(setSvg)
			.catch(() => setStatus('error'))
			.then(() => setStatus('success'))
	}, [iconName])

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
		changeStrokeColor(strokeColor)
	}, [containerHasRef, strokeColor, hasRef, status])
	useEffect(
		() => changeStrokeWidth(strokeWidth),
		[containerHasRef, strokeWidth, hasRef],
	)
	useEffect(() => changeSize(iconSize), [containerHasRef, iconSize, hasRef])

	useEffect(() => {
		if (containerHasRef && containerRef.current && !iconRef.current) {
			// eslint-disable-next-line functional/immutable-data
			iconRef.current = containerRef.current.children[0] as SVGElement
			setHasRef(true)
		}
	}, [containerRef, containerHasRef])

	return [svg, status]
}
