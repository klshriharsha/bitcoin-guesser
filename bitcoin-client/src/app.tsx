import { CircularProgress, Container, Stack, Typography } from '@mui/material'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { Game } from './components/game'
import { GameEmpty } from './components/game-empty'
import { GameSnackbar } from './components/game-snackbar'
import { Login } from './components/login'
import { PriceTicker } from './components/price-ticker'
import { UserMenu } from './components/user-menu'
import { YourGuess } from './components/your-guess'
import { priceKey } from './queries/price.query'
import { getUser, userKey } from './queries/user.query'

function App() {
    const [openSnackbar, toggleSnackbar] = useState(false)
    const [shouldPoll, setShouldPoll] = useState(false)
    const {
        data: currentUser,
        isLoading,
        isFetching,
    } = useQuery({
        refetchInterval: shouldPoll ? 2000 : undefined,
        refetchOnWindowFocus: false,
        queryKey: userKey,
        queryFn: getUser,
    })
    const queryClient = useQueryClient()

    const lastGuessResolution = currentUser?.guesses[0]?.resolution
    const resolvedGuesses = currentUser?.guesses.filter(g => g.resolution !== 'UNRESOLVED') ?? []

    useEffect(() => {
        const newValue = currentUser?.guesses[0]?.resolution === 'UNRESOLVED'
        if (!newValue && shouldPoll) {
            toggleSnackbar(true)
        }

        setShouldPoll(newValue)
    }, [currentUser, shouldPoll])

    useEffect(() => {
        if (shouldPoll && currentUser?.guesses[0]?.resolution !== 'UNRESOLVED') {
            queryClient.invalidateQueries({ queryKey: priceKey })
        }
    }, [shouldPoll, currentUser, queryClient])

    return (
        <Container sx={{ height: '100%' }}>
            {lastGuessResolution && (
                <GameSnackbar
                    open={openSnackbar}
                    onClose={() => toggleSnackbar(false)}
                    resolution={lastGuessResolution}
                />
            )}
            <Stack height="100%">
                <Stack
                    spacing={4}
                    height="60px"
                    direction="row"
                    paddingBlock={1}
                    alignItems="center"
                    justifyContent="flex-end"
                >
                    {!isLoading && currentUser && (
                        <Typography variant="h6" textAlign="right" marginRight="10px">
                            Score: {currentUser.score}
                        </Typography>
                    )}
                    {isLoading && <CircularProgress size={25} />}
                    {!isLoading && !currentUser && <Login />}
                    {!isLoading && currentUser && <UserMenu currentUsername={currentUser.username} />}
                </Stack>
                <PriceTicker />
                <Stack flex={1} paddingBlock={2} spacing={2} justifyContent="space-between">
                    <Stack flex={1} justifyContent="center" alignItems="center" spacing={2}>
                        {!isLoading && !currentUser && <GameEmpty />}
                        {!isLoading && currentUser && <Game guesses={currentUser.guesses} isUpdating={isFetching} />}
                        {isLoading && <CircularProgress />}
                    </Stack>
                    <Stack spacing={1}>
                        {resolvedGuesses.length > 0 && (
                            <>
                                <Typography variant="h6">Your Latest Guesses:</Typography>
                                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                                    {resolvedGuesses
                                        .filter(guess => guess.resolution !== 'UNRESOLVED')
                                        .slice(0, 5)
                                        .map(guess => (
                                            <YourGuess key={guess.id} guess={guess} />
                                        ))}
                                </Stack>
                            </>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default App
