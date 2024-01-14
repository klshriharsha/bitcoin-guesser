import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { IconButton, Stack, Typography } from '@mui/material'

import { Trend } from '../queries/user.query'

type GuessProps = {
    onGuess: (trend: Trend) => void
}

export function Guess({ onGuess }: GuessProps) {
    return (
        <Stack alignItems="center" spacing={2}>
            <Typography variant="h4">Will Bitcoin go down or up?</Typography>
            <Stack direction="row" spacing={2}>
                <IconButton
                    color="primary"
                    size="large"
                    aria-label="guess downward trend"
                    onClick={() => onGuess('DOWNWARD')}
                >
                    <ArrowDownwardIcon sx={{ fontSize: '2em' }} />
                </IconButton>
                <IconButton
                    color="primary"
                    size="large"
                    aria-label="guess upward trend"
                    onClick={() => onGuess('UPWARD')}
                >
                    <ArrowUpwardIcon sx={{ fontSize: '2em' }} />
                </IconButton>
            </Stack>
        </Stack>
    )
}
