import { Trend } from '@prisma/client'

export const TRENDS = ['UPWARD', 'DOWNWARD']

export function isTrendValid(trend: Trend) {
    return TRENDS.includes(trend)
}
