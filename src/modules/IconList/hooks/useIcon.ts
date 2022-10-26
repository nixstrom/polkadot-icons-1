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
	readonly iconName: string
	readonly containerRef: MutableRefObject<HTMLDivElement | null>
	readonly containerHasRef: boolean
}

type Status = 'loading' | 'error' | 'success'

export const useIcon = ({ iconName, containerRef, containerHasRef }: Props) => {
	const { strokeColor, strokeWidth, fillColor, cornerType, iconSize, style } =
		useCustomisationContext()
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

	const changeFillColor = (newColor: string) => {
		if (iconRef.current) {
			const paths = iconRef.current?.querySelectorAll('path') || []

			paths.forEach(p => {
				p.setAttribute('fill', newColor)
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

	const changeCornerType = (newCornerType: string) => {
		if (iconRef.current) {
			const paths = iconRef.current?.querySelectorAll('path') || []
			const [linecap, linejoin] =
				newCornerType === 'round' ? ['round', 'round'] : ['square', 'miter']

			paths.forEach(p => {
				p.setAttribute('stroke-linecap', linecap)
				p.setAttribute('stroke-linejoin', linejoin)
			})
		}
	}

	const changeSize = (newSize: string) => {
		if (iconRef.current) {
			iconRef.current.setAttribute('height', newSize)
			iconRef.current.setAttribute('width', newSize)
		}
	}

	const changeStyle = useCallback(
		(newStyle: CustomisationContextType['style']) => {
			if (iconRef.current) {
				const paths = iconRef.current?.querySelectorAll('path') || []

				if (newStyle === 'solid') {
					paths.forEach(p => {
						p.setAttribute('fill', fillColor)
						p.setAttribute('stroke', fillColor)
					})
				} else if (newStyle === 'keyline') {
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
		[fillColor, strokeColor],
	)

	useEffect(() => {
		changeStrokeColor(strokeColor)
	}, [containerHasRef, strokeColor, hasRef, status])
	useEffect(
		() => changeStrokeWidth(strokeWidth),
		[containerHasRef, strokeWidth, hasRef],
	)
	useEffect(() => {
		changeFillColor(fillColor)
	}, [containerHasRef, fillColor, hasRef, status])
	useEffect(
		() => changeCornerType(cornerType),
		[containerHasRef, cornerType, hasRef],
	)
	useEffect(() => changeSize(iconSize), [containerHasRef, iconSize, hasRef])

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
