export type AppError = {
    errorCode: number
    errorMessage: string
}

/**
 * parses response as a JSON and throws if it contains error
 */
export function handleResponse<T>(response: Promise<Response>): Promise<T> {
    return response
        .then(res => res.json())
        .then(res => {
            if ('errorCode' in res && 'errorMessage' in res) {
                throw res
            }

            return res
        })
}

export function getEndpoint(endpoint: string) {
    return `${import.meta.env.VITE_BASE_URL}/${endpoint}`
}
