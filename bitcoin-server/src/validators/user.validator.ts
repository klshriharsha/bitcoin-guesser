export function isUsernameValid(username: string) {
    const regex = /^[A-Za-z0-9]{3,30}$/
    const isInvalid = !username || !regex.test(username)

    return !isInvalid
}
