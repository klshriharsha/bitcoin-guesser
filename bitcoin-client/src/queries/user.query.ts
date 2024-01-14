import { getEndpoint, handleResponse } from '../util/fetch.util'
import { getCurrentUsername } from '../util/user.util'

/**
 * fetches current user using username from localStorage
 */
export function getUser() {
    const username = getCurrentUsername()

    if (!username) {
        return null
    }

    return handleResponse<User>(fetch(getEndpoint(`user/${username}?include=latest-guesses`)))
}
export const userKey = ['current-user']

/**
 * creates a new user
 */
export function createUser(username: string) {
    return handleResponse<User>(fetch(getEndpoint(`user/${username}`), { method: 'post' }))
}

/**
 * makes a guess as current user
 */
export function makeGuess({ trend }: MakeGuessParams) {
    return handleResponse(
        fetch(getEndpoint(`user/${getCurrentUsername()}/make-guess`), {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ trend }),
        }),
    )
}

export type User = {
    id: string
    username: string
    createdAt: string
    score: number
    guesses: Guess[]
}
export type Guess = {
    id: string
    createdAt: string
    resolution: 'CORRECT' | 'INCORRECT' | 'UNRESOLVED' | 'INDETERMINATE'
    trend: 'UPWARD' | 'DOWNWARD'
    currentPrice: number
    username: string
}
export type Trend = 'UPWARD' | 'DOWNWARD'
export type MakeGuessParams = {
    trend: Trend
}
