import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone'
import {
    Button,
    CircularProgress,
    Container,
    Drawer,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'

import { createUser, userKey } from '../queries/user.query'
import { setCurrentUsername } from '../util/user.util'

export function Login() {
    const [username, setUsername] = useState('')
    const [showDrawer, toggleDrawer] = useState(false)

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: createUser,
        onSettled: () => {
            setCurrentUsername(username)
            queryClient.invalidateQueries({ queryKey: userKey })
            toggleDrawer(false)
        },
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate(username)
    }

    return (
        <>
            <Button
                size="large"
                onClick={() => toggleDrawer(true)}
                sx={{ textTransform: 'capitalize' }}
                startIcon={<AccountBoxTwoToneIcon />}
            >
                Login
            </Button>
            <Drawer className="user-drawer" anchor="top" open={showDrawer} onClose={() => toggleDrawer(false)}>
                <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                    <AccountBoxTwoToneIcon color="primary" sx={{ marginTop: '14px', fontSize: '9rem' }} />
                    <Typography variant="h3">Login</Typography>
                    <Typography variant="subtitle1">Enter a username to start playing</Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack direction="row" justifyContent="center" alignItems="baseline" padding={2} spacing={1}>
                            <TextField
                                size="small"
                                id="username"
                                label="Username"
                                value={username}
                                variant="standard"
                                autoFocus={showDrawer}
                                sx={{ minWidth: '60%' }}
                                InputProps={
                                    isPending
                                        ? {
                                              endAdornment: (
                                                  <InputAdornment position="end" sx={{ marginBottom: '6px' }}>
                                                      <CircularProgress size={20} />
                                                  </InputAdornment>
                                              ),
                                          }
                                        : {}
                                }
                                onChange={e => setUsername(e.target.value)}
                            />
                            <Button type="submit" variant="contained" size="medium" disabled={isPending}>
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Container>
            </Drawer>
        </>
    )
}
