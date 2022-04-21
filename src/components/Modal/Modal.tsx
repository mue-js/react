import React, {
    ReactPortal,
    useState,
    useEffect,
    useRef,
    useCallback,
    ReactNode,
    CSSProperties,
} from 'react'
import { createPortal } from 'react-dom'
import { onEscape } from '../../utils/keyboardHandlers'

import ErrorBoundary from '../ErrorBoundary'

import { getTranslateAnimation } from './static'
import type { FuncPropBool, FuncPropAny, FuncNoProp } from './static'
import { DirectionType } from '../../types'

export interface ModalChildrenProps {
    close: FuncPropBool
    valid: FuncPropAny
    refuse: FuncNoProp
}

export interface ModalProps {
    id?: string
    align?: string
    justify?: string
    padding?: string
    className?: string
    containerClassName?: string
    animationDuration?: number
    from?: DirectionType
    style?: CSSProperties
    containerStyle?: CSSProperties
    children?: ReactNode | ((prop: ModalChildrenProps) => ReactNode)
    onClose: FuncPropBool
    onValid?: FuncPropAny
    onRefuse?: FuncNoProp
    whileClosing?: FuncPropBool
}

export function UncatchedModal({
    id,
    align = 'items-center',
    justify = 'justify-center',
    padding = 'p-30',
    className = 'max-w-60vw h-50vh',
    containerClassName = '',
    animationDuration = 300,
    from = 'bottom',
    style = {},
    containerStyle = {},
    children,
    onClose = () => undefined,
    onValid = () => undefined,
    onRefuse = () => undefined,
    whileClosing = () => undefined,
}: ModalProps): ReactPortal | null {
    const ref = useRef<HTMLDivElement>(null)
    const [open, _setOpen] = useState(true)
    const [closing, _setClosing] = useState(false)
    const openRef = useRef(open)
    const closingRef = useRef(closing)

    const setOpen: FuncPropBool = v => {
        const newValue = v ?? false
        openRef.current = newValue
        _setOpen(newValue)
    }

    // start animation
    const setClosing: FuncPropBool = v => {
        const newValue = v ?? false
        closingRef.current = newValue
        _setClosing(newValue)
    }

    const close: FuncPropBool = hasRefused => {
        if (openRef.current) {
            whileClosing(hasRefused)
            setClosing(true)
        }
    }

    const valid: FuncPropAny = v => {
        onValid(v)
        close(false)
    }
    const refuse: FuncNoProp = () => {
        onRefuse()
        close(true)
    }

    const escFunction = useCallback(
        (e: KeyboardEvent | React.KeyboardEvent) => onEscape(e, () => close(true)),
        [close],
    )

    useEffect(() => {
        document.addEventListener('keydown', escFunction, false)

        return () => {
            document.removeEventListener('keydown', escFunction, false)
        }
    }, [escFunction])

    function handleClickOutside(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            close(true)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [handleClickOutside])

    useEffect(() => {
        if (open) {
            if (closing) {
                document.body.classList.toggle('modal-open', false)

                const timer = setTimeout(() => {
                    if (open) {
                        setOpen(false)
                        setClosing(false)
                        // send false to simplify the usage of onClose
                        // example : onClose={setOpen} instead of onClose={() => setOpen(false)}
                        onClose(false)
                    }
                }, animationDuration)
                return () => clearTimeout(timer)
            } else {
                document.body.classList.toggle('modal-open', true)
            }
        }
        return
    }, [open, closing, onClose, animationDuration])

    if (!open) return null

    const modal = (
        <div
            className={[
                'modal-bg flex',
                align,
                justify,
                containerClassName,
                open && (closing ? 'to-opacity-0' : 'to-opacity-100'),
            ]
                ?.filter(e => !!e)
                .join(' ')}
            style={{ '--animation-duration': animationDuration, ...containerStyle }}
        >
            <div
                id={id}
                className={[
                    'modal flex flex-col rounded-lg w-100%',
                    className,
                    padding,
                    getTranslateAnimation({ open, closing, from }),
                ]
                    ?.filter(e => !!e)
                    .join(' ')}
                ref={ref}
                style={{ '--animation-duration': animationDuration, ...style }}
            >
                {typeof children === 'function' ? children({ close, valid, refuse }) : children}
            </div>
        </div>
    )

    const modalRoot = document.getElementById('modal-root')
    return modalRoot ? createPortal(modal, modalRoot) : null
}

export default function Modal(props: ModalProps) {
    return (
        <ErrorBoundary fallback="Houston, on a un problème" showDetails>
            <UncatchedModal {...props} />
        </ErrorBoundary>
    )
}
