import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone'
import { Button, Menu, MenuItem } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { MouseEvent, useState } from 'react'

import { userKey } from '../queries/user.query'
import { unsetCurrentUsername } from '../util/user.util'

type UserMenuProps = {
    currentUsername: string
}

export function UserMenu({ currentUsername }: UserMenuProps) {
    const queryClient = useQueryClient()
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

    const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(e.currentTarget)
    }

    const handleCloseMenu = () => {
        setMenuAnchor(null)
    }

    const handleLogout = () => {
        setMenuAnchor(null)
        unsetCurrentUsername()
        queryClient.invalidateQueries({ queryKey: userKey })
    }

    const open = !!menuAnchor

    return (
        <>
            <Button
                size="large"
                id="user-menu-button"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                aria-controls={open ? 'user-menu' : undefined}
                onClick={handleOpenMenu}
                sx={{ textTransform: 'lowercase' }}
                startIcon={<AccountBoxTwoToneIcon />}
            >
                {currentUsername}
            </Button>
            <Menu
                open={open}
                id="user-menu"
                anchorEl={menuAnchor}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'user-menu-button',
                }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}
