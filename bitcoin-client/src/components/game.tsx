import { CircularProgress, Stack, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

import { priceKey } from '../queries/price.query'
import { Guess as GuessType, makeGuess, Trend, userKey } from '../queries/user.query'
import { Confirm } from './confirm'
import { Guess } from './guess'
import { YourGuess } from './your-guess'

type GameProps = {
    isUpdating: boolean
    guesses: GuessType[]
}

const MESSAGES = [
    'Waiting for next update...',
    'Your guess is still unresolved. Please wait...',
    'It might take up to 60 seconds for your guess to resolve...',
]

export function Game({ guesses, isUpdating }: GameProps) {
    const messageRef = useRef<number>(0)
    const ref = useRef<Trend | null>(null)
    const [showConfirmation, toggleConfirmation] = useState(false)
    const latestGuess = guesses[0]
    const hasUnresolvedGuess = latestGuess?.resolution === 'UNRESOLVED'

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: makeGuess,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKey })
            queryClient.invalidateQueries({ queryKey: priceKey })
        },
    })

    const handleGuess = (trend: Trend) => {
        toggleConfirmation(true)
        ref.current = trend
    }

    const handleConfirm = () => {
        mutate({ trend: ref.current as Trend })
        toggleConfirmation(false)
        ref.current = null
    }

    const handleBack = () => {
        toggleConfirmation(false)
        ref.current = null
    }

    useEffect(() => {
        if (hasUnresolvedGuess) {
            const timer = setInterval(() => {
                messageRef.current = (messageRef.current + 1) % MESSAGES.length
            }, 4000)

            return () => clearInterval(timer)
        }
    }, [hasUnresolvedGuess])

    if (isPending) {
        return <CircularProgress />
    }

    return (
        <>
            {showConfirmation && (
                <Confirm onConfirm={handleConfirm} onBack={handleBack} selectedTrend={ref.current as Trend} />
            )}
            {!hasUnresolvedGuess && !showConfirmation && !isUpdating && <Guess onGuess={handleGuess} />}
            {hasUnresolvedGuess && (
                <Stack alignItems="center" spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="h4">Your Guess is</Typography>
                        <YourGuess guess={latestGuess} />
                    </Stack>
                    <Typography
                        variant="subtitle1"
                        className={classNames('transition-opacity', { 'transition-opacity--dim': isUpdating })}
                    >
                        {MESSAGES[messageRef.current]}
                    </Typography>
                </Stack>
            )}
        </>
    )
}
