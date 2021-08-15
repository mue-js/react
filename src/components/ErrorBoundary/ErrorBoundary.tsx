import React, { Component, ErrorInfo, ReactNode } from 'react'

// hooks
import useGridify, { GridifyProps } from '../../hooks/useGridify'

interface State {
    error?: Error
    errorInfo?: ErrorInfo
}

export interface ErrorMessageProps extends State, GridifyProps {
    fallback?: string | ((s: State) => ReactNode)
    showDetails?: boolean
    className?: string
}

export interface ErrorBoundaryProps extends ErrorMessageProps {
    children: ReactNode
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
    public state: State = { error: undefined, errorInfo: undefined }

    componentDidCatch = (error: Error, errorInfo: ErrorInfo) => catchFunc(error, errorInfo, this)

    render() {
        const { children } = this.props
        if (this.state.errorInfo) {
            return handleError(this)
        }
        // Normally, just render children
        return typeof children === 'function' ? children() : children
    }
}

export function ErrorMessage({
    fallback = 'Something went wrong.',
    showDetails = false,
    error,
    errorInfo,
    ...rest
}: ErrorMessageProps) {
    const { className, ...props } = useGridify({
        componentName: 'ErrorMessage',
        ...rest,
    })

    return (
        <div className={`p-4% ${className ?? ''}`} {...props}>
            {typeof fallback === 'function' ? fallback({ error, errorInfo }) : <h2>{fallback}</h2>}

            {showDetails && (
                <details className="error-details" style={{ whiteSpace: 'pre-wrap' }}>
                    <div className="text-error font-18">{error && error.toString()}</div>
                    <div>{errorInfo.componentStack}</div>
                </details>
            )}
        </div>
    )
}

export const catchFunc = (error: Error, errorInfo: ErrorInfo, context: any) => {
    // catch errors in any components below and re-render with error message
    context.setState({
        error: error,
        errorInfo: errorInfo,
    })
    // log error messages, etc.
}

export function handleError({ props, state }: any) {
    const { error = null, errorInfo = null } = state || {}
    return <ErrorMessage {...props} error={error} errorInfo={errorInfo} />
}

export default ErrorBoundary
