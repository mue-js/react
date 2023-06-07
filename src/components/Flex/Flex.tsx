// types
import { WithChildren } from '../../types'

// hooks
import useGridify, { GridifyProps } from '../../hooks/useGridify'

// components
import ErrorBoundary from '../ErrorBoundary'
import { cN } from '../../utils/classNames'

export interface FlexProps extends WithChildren, GridifyProps {
    column: boolean
    reverse: boolean
}

export function UncatchedFlex({ column = false, reverse = false, children, ...rest }: FlexProps) {
    const { className, ...props } = useGridify({
        componentName: 'Flex',
        ...rest,
    })

    return (
        <div className={cN([className, column && 'flex-column', reverse && 'reverse'])} {...props}>
            {children}
        </div>
    )
}

export const Flex = (props: FlexProps) => {
    return (
        <ErrorBoundary fallback="Houston, on a un problème" showDetails>
            <UncatchedFlex {...props} />
        </ErrorBoundary>
    )
}

export default Flex
