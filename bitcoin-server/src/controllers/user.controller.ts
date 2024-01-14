import { Request, Response } from 'express'

import { isError, sendError } from '../errors/app.error'
import { badRequestError, notFoundError } from '../errors/http.errors'
import { createUser, getUser, makeGuess } from '../services/user.service'
import { isTrendValid, TRENDS } from '../validators/guess.validator'
import { isUsernameValid } from '../validators/user.validator'

export async function get(req: Request, res: Response) {
    const { username } = req.params ?? {}
    const { include } = req.query ?? {}
    if (!isUsernameValid(username)) {
        sendError(res, notFoundError('username not found'))
        return
    }

    const user = await getUser(username, ((include as string) ?? '').split(','))
    if (isError(user)) {
        sendError(res, user)
        return
    }

    res.json(user)
}

export async function create(req: Request, res: Response) {
    const { username } = req.params ?? {}
    if (!isUsernameValid(username)) {
        sendError(res, badRequestError('username must be alphanumeric and between 3 and 30 characters'))
        return
    }

    const user = await createUser(username)
    if (isError(user)) {
        sendError(res, user)
        return
    }

    res.json(user)
}

export async function guess(req: Request, res: Response) {
    const { username } = req.params ?? {}
    if (!isUsernameValid(username)) {
        sendError(res, notFoundError('username not found'))
        return
    }

    const { trend } = req.body ?? {}
    if (!isTrendValid(trend)) {
        sendError(res, badRequestError(`trend must be one of (${TRENDS.join(', ')})`))
        return
    }

    const guess = await makeGuess({ username, trend })
    if (isError(guess)) {
        sendError(res, guess)
        return
    }

    res.json(guess)
}
