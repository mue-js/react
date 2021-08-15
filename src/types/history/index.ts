export interface History {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    push: (...props: any) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    goBack: (...props: any) => void
}
