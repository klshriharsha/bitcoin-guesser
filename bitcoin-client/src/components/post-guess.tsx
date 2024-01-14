import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { IconButton, Stack, Typography } from '@mui/material'

export function PostGuess() {
    return (
        <>
            <Typography variant="h5">Your guess:</Typography>
            <Stack direction="row">
                <IconButton color="primary" size="large" aria-label="guessed downward trend">
                    <ArrowDownwardIcon />
                </IconButton>
                <IconButton color="primary" size="large" aria-label="guessed upward trend">
                    <ArrowUpwardIcon />
                </IconButton>
            </Stack>
        </>
    )
}
