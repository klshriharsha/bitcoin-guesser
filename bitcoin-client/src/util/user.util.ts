export function getCurrentUsername() {
    return window.localStorage.getItem('username') ?? ''
}

export function setCurrentUsername(username: string) {
    window.localStorage.setItem('username', username)
}

export function unsetCurrentUsername() {
    window.localStorage.removeItem('username')
}
