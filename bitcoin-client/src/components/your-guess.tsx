import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Alert, AlertColor, Stack, Typography } from '@mui/material'

import { Guess } from '../queries/user.query'

type YourGuessProps = {
    guess: Partial<Guess>
    size?: 'sm'
}

export function YourGuess({ guess, size }: YourGuessProps) {
    let severity: AlertColor = 'info'
    if (guess.resolution === 'CORRECT') {
        severity = 'success'
    }
    if (guess.resolution === 'INCORRECT') {
        severity = 'error'
    }
    if (guess.resolution === 'INDETERMINATE') {
        severity = 'warning'
    }

    return (
        <Alert severity={severity} variant="filled" icon={false} sx={size === 'sm' ? { padding: '0 8px' } : {}}>
            <Stack direction="row" alignItems="center" justifyContent="center">
                {guess.currentPrice && <Typography>{guess.currentPrice.toLocaleString()}</Typography>}
                {guess.trend === 'UPWARD' && <ArrowUpwardIcon />}
                {guess.trend === 'DOWNWARD' && <ArrowDownwardIcon />}
            </Stack>
        </Alert>
    )
}
