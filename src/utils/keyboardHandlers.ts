import React from 'react'

type KBEventHandler = (
    e: KeyboardEvent | React.KeyboardEvent,
    callback: (e: KeyboardEvent | React.KeyboardEvent) => void,
) => void

export const onEscape: KBEventHandler = (e, callback) => {
    if (e.key === 'Escape' || e.key === 'Esc' || e.code === '27') {
        callback(e)
    }
}

export const onSpaceBar: KBEventHandler = (e, callback) => {
    if (e.key === 'Space' || e.code === '32') {
        callback(e)
    }
}
