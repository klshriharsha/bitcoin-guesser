import { Response } from 'express'

export type AppError = {
    errorCode: number
    errorMessage: string
}

export function isError(obj: unknown): obj is AppError {
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        return 'errorCode' in obj && 'errorMessage' in obj
    }

    return false
}

export function sendError(res: Response, err: AppError) {
    res.status(err.errorCode).json(err)
}
