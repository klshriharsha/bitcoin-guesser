import { Button, Stack, Typography } from '@mui/material'

import { Trend } from '../queries/user.query'
import { YourGuess } from './your-guess'

type ConfirmProps = {
    onConfirm: VoidFunction
    onBack: VoidFunction
    selectedTrend: Trend
}

export function Confirm({ selectedTrend, onConfirm, onBack }: ConfirmProps) {
    return (
        <Stack alignItems="center" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h4">Your Guess is</Typography>
                <YourGuess guess={{ trend: selectedTrend }} size="sm" />
            </Stack>
            <Stack spacing={2} alignItems="center">
                <Typography variant="h5">Are you sure?</Typography>
                <Stack direction="row" justifyContent="space-between" spacing={4}>
                    <Button size="small" variant="outlined" onClick={onBack}>
                        Back
                    </Button>
                    <Button size="small" variant="contained" onClick={onConfirm}>
                        Yes
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    )
}
