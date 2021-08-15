export function camelToKebab(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

export function camelToSnake(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase()
}
