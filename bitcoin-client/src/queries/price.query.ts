import { getEndpoint, handleResponse } from '../util/fetch.util'

/**
 * fetches the current bitcoin/usd price
 */
export function getPrice() {
    return handleResponse<Price>(fetch(getEndpoint('price')))
}
export const priceKey = ['price']

export type Price = {
    price: number
    timestamp: number
    currency: string
}
