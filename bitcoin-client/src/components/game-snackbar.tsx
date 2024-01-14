import { Alert, AlertColor, Snackbar } from '@mui/material'

import { Guess } from '../queries/user.query'

const SNACKBAR: Record<string, { severity: AlertColor; message: string }> = {
    CORRECT: { severity: 'success', message: 'Your guess was correct!' },
    INCORRECT: { severity: 'error', message: 'Your guess was incorrect!' },
    INDETERMINATE: { severity: 'info', message: 'Bitcoin price did not change in the last 60 seconds' },
}

type GameSnackbarProps = {
    open: boolean
    onClose: VoidFunction
    resolution: Guess['resolution']
}

export function GameSnackbar({ open, onClose, resolution }: GameSnackbarProps) {
    if (resolution === 'UNRESOLVED') {
        return null
    }

    return (
        <Snackbar
            onClose={onClose}
            open={open}
            autoHideDuration={10000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={onClose} severity={SNACKBAR[resolution].severity} sx={{ width: '100%' }}>
                {SNACKBAR[resolution].message}
            </Alert>
        </Snackbar>
    )
}
