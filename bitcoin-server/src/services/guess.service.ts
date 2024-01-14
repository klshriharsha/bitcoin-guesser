import { Guess, Resolution, Trend } from '@prisma/client'

import { prisma } from '../db/client'
import { getPrice } from './price.service'

type Score = { increment: 1 } | { decrement: 1 }
type ComputeScore = {
    score?: Score
    result?: Resolution
}

/**
 * calculates the actual trend, compares it with the guessed trend and returns
 * the player's score and result
 */
function computeScore(newPrice: number, guess: Guess): ComputeScore {
    const elapsedTime = new Date().getTime() - new Date(guess.createdAt).getTime()
    const actualTrend: Trend =
        newPrice - guess.currentPrice > 0 ? 'UPWARD' : newPrice - guess.currentPrice === 0 ? 'UNCHANGED' : 'DOWNWARD'
    const guessedTrend = guess.trend

    let result: Resolution = actualTrend === guessedTrend ? 'CORRECT' : 'INCORRECT'
    if (actualTrend === 'UNCHANGED' && elapsedTime < 3e4) {
        return {}
    }

    if (actualTrend === 'UNCHANGED') {
        result = 'INDETERMINATE'

        return { result }
    }

    let score: Score = { decrement: 1 }
    if (result === 'CORRECT') {
        score = { increment: 1 }
    }

    return { score, result }
}

/**
 * checks unresolved guesses at intervals and attempts to resolve them
 */
export async function initiateGuessResolver() {
    setInterval(async () => {
        const unresolvedGuesses = await prisma.guess.findMany({ where: { resolution: 'UNRESOLVED' } })
        if (!unresolvedGuesses.length) {
            return
        }

        const newPrice = await getPrice()
        unresolvedGuesses.forEach(async guess => {
            const { score, result } = computeScore(newPrice.price, guess)
            if (result) {
                await prisma.guess.update({
                    where: { id: guess.id },
                    data: { resolution: result },
                })
                console.log(`updated: ${guess.username}'s guess`)
            }
            if (score) {
                await prisma.user.update({
                    where: { username: guess.username },
                    data: { score },
                })
            }
        })
    }, 15000)
}
