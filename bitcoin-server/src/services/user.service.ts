import { Trend } from '@prisma/client'

import { prisma } from '../db/client'
import { badRequestError, notFoundError } from '../errors/http.errors'
import { getPrice } from './price.service'

const USER_INCLUDE = {
    LATEST_GUESSES: 'latest-guesses',
}

export async function getUser(username: string, include: string[]) {
    const user = await prisma.user.findUnique({ where: { username }, include: { guesses: true } })
    if (!user) {
        return notFoundError('user not found')
    }

    user.guesses = []
    if (include.includes(USER_INCLUDE.LATEST_GUESSES)) {
        const guesses = await prisma.guess.findMany({ where: { username }, orderBy: { createdAt: 'desc' }, take: 10 })
        user.guesses = guesses
    }

    return user
}

export async function createUser(username: string) {
    const userExists = await prisma.user.count({ where: { username } })
    if (userExists) {
        return badRequestError('user already exists')
    }

    const user = await prisma.user.create({ data: { username } })

    return user
}

type MakeGuessParams = {
    username: string
    trend: Trend
}

export async function makeGuess({ username, trend }: MakeGuessParams) {
    const userExists = await prisma.user.count({ where: { username } })
    if (!userExists) {
        return notFoundError('user not found')
    }

    const lastGuess = await prisma.guess.findFirst({ where: { username }, orderBy: { createdAt: 'desc' } })
    if (lastGuess?.resolution === 'UNRESOLVED') {
        return badRequestError("users's last guess is not resolved")
    }

    const currentPrice = await getPrice()
    const guess = await prisma.guess.create({
        data: { user: { connect: { username } }, trend, currentPrice: currentPrice.price },
    })

    return guess
}
