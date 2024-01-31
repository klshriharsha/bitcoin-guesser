export function formatTime(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleTimeString(undefined, { hour12: true })
}
