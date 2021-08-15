import React, { FC, ReactNode, useState, useEffect, useRef, CSSProperties } from 'react'

export interface DropdownChildrenProps {
    close: () => void
}

export interface DropdownTriggerProps {
    isOpen: boolean
    open: () => void
    close: () => void
}

export interface DropdownProps {
    role?: string
    trigger: FC<DropdownTriggerProps>
    children?: ReactNode
    content?: number | string | ReactNode
    direction?: string
    style?: CSSProperties
    contentStyle?: CSSProperties
    className?: string
    containerClassName?: string
    contentClassName?: string
    invisible?: boolean
    disabled?: boolean
    removeFromDOMWhenClosed?: boolean
    onClick?: () => void
    onOpen?: () => void
    onClose?: () => void
}

export default function Dropdown({
    role,
    trigger,
    content,
    children = content,
    direction,
    style,
    contentStyle,
    className = '',
    containerClassName = '',
    contentClassName = '',
    invisible = false,
    disabled = false,
    removeFromDOMWhenClosed = false,
    onClick = () => undefined,
    onOpen = () => undefined,
    onClose = () => undefined,
}: DropdownProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isOpen, _setOpen] = useState(false)
    const isOpenRef = useRef(isOpen)

    const setOpen = (v: boolean) => {
        isOpenRef.current = v
        _setOpen(v)
    }

    const open = () => {
        if (!isOpenRef.current) {
            onOpen()
            setOpen(true)
        }
    }
    const close = () => {
        if (isOpenRef.current) {
            onClose()
            setOpen(false)
        }
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        if (disabled) return null
        isOpen ? close() : open()
        onClick()
        return null
    }

    const escFunction = (e: KeyboardEvent) => {
        if (e.code === '27') {
            close()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', escFunction, false)
        return () => {
            document.removeEventListener('keydown', escFunction, false)
        }
    }, [])

    function handleClickOutside(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            close()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div
            role={role}
            className={[containerClassName, 'dropdown-container', invisible && 'invisible']
                .filter(Boolean)
                .join(' ')}
            ref={ref}
            style={style}
        >
            <button
                type="button"
                className={['inline-block', className, isOpen && 'open'].filter(Boolean).join(' ')}
                onClick={handleClick}
            >
                {typeof trigger === 'function' ? trigger({ isOpen, open, close }) : trigger}
            </button>

            {(isOpen || !removeFromDOMWhenClosed) && (
                <div
                    className={[
                        'dropdown-content overflow-y-auto border border-dark-15',
                        isOpen && 'displayed',
                        direction && 'to-' + direction,
                        contentClassName,
                    ]
                        .filter(Boolean)
                        .join(' ')}
                    style={contentStyle}
                >
                    {typeof children === 'function' ? children({ close }) : children}
                </div>
            )}
        </div>
    )
}
