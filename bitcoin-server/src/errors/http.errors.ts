import { AppError } from './app.error'

export function notFoundError(message = 'not found'): AppError {
    return { errorCode: 404, errorMessage: message }
}

export function badRequestError(message = 'bad request'): AppError {
    return { errorCode: 400, errorMessage: message }
}
