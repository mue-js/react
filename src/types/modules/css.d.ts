import * as CSS from 'csstype'

declare module 'csstype' {
    interface Properties {
        // Add a missing property
        WebkitRocketLauncher?: string

        // ...or allow any other property
        [index: string]: string | number | Properties
    }
}
