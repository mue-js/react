import { TOP, LEFT, RIGHT, BOTTOM } from '../../enum'
import type { DirectionType } from '../../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FuncPropAny = (v: any) => void

export type FuncPropBool = (bool: boolean) => void
export type FuncNoProp = () => void

interface TranslateAnimationProps {
    open: boolean
    closing: boolean
    from: DirectionType
}

export function getTranslateAnimation({
    open,
    closing,
    from,
}: TranslateAnimationProps): string | false {
    switch (from) {
        case TOP: {
            return open && (closing ? 'to-translateY--100' : 'to-translateY--0')
        }
        case LEFT: {
            return open && (closing ? 'to-translateX--100' : 'to-translateX--0')
        }
        case RIGHT: {
            return open && (closing ? 'to-translateX-100' : 'to-translateX-0')
        }
        case BOTTOM:
        default:
            return open && (closing ? 'to-translateY-100' : 'to-translateY-0')
    }
}
