import { Container, Typography } from '@mui/material'

import loginEmpty from '../assets/login-empty.svg'

export function GameEmpty() {
    return (
        <Container maxWidth="xs" sx={{ textAlign: 'center' }}>
            <img src={loginEmpty} width="100%" />
            <Typography variant="h5" marginTop={4}>
                Login to start playing
            </Typography>
        </Container>
    )
}
