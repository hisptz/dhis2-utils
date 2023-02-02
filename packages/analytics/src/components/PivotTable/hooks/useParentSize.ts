import {useEffect, useRef, useState} from 'react'
import ResizeObserver from 'resize-observer-polyfill'

const initialState = {width: 0, height: 0}

export const useParentSize = (
    elementRef: ReturnType<typeof useRef<HTMLElement | null>>,
    renderCounter: number,
    initialSize = initialState
) => {
    const [size, setSize] = useState({
        width: initialSize.width || 0,
        height: initialSize.height || 0,
    })

    useEffect(() => {
        const el: HTMLElement | undefined | null = elementRef.current && elementRef.current.parentElement
        if (!el) {
            return
        }

        const onResize = () => {
            setSize({
                width: el.clientWidth,
                height: el.clientHeight,
            })
        }

        onResize()

        if (renderCounter) {
            setSize(initialState)
        }

        const observer = new ResizeObserver(onResize)
        observer.observe(el)

        return () => observer.disconnect()
    }, [elementRef, renderCounter])

    return size
}
