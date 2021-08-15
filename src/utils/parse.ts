import memoize from 'lodash.memoize'

function _tryParse(item: string | object) {
    const toParse: string = typeof item === 'string' ? item : JSON.stringify(item)
    let parsed

    try {
        parsed = JSON.parse(toParse)
    } catch (e) {
        return item
    }

    if (parsed instanceof Object && parsed !== null) {
        return parsed
    }

    return undefined
}

export const tryParse = memoize(_tryParse)
