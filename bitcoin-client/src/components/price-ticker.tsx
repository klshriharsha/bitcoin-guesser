import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin'
import { Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'

import { useTrend } from '../hooks/useTrend'
import { getPrice, priceKey } from '../queries/price.query'
import { formatTime } from '../util/time.util'

export function PriceTicker() {
    const { data, isLoading, isFetching } = useQuery({
        refetchOnWindowFocus: false,
        queryKey: priceKey,
        queryFn: getPrice,
    })
    const { icon: tickerIcon, background: tickerBackground } = useTrend({ price: data?.price, isFetching })

    if (isLoading || !data) {
        return null
    }

    return (
        <Stack
            padding={2}
            spacing={0}
            height="125px"
            sx={{ backgroundColor: tickerBackground }}
            className={classNames('transition-opacity', { 'transition-opacity--dim': isFetching })}
        >
            {!isLoading && data && (
                <>
                    <Stack direction="row" alignItems="baseline">
                        <CurrencyBitcoinIcon fontSize="large" sx={{ alignSelf: 'center' }} />
                        <Typography variant="h2">{data?.price.toLocaleString()}</Typography>
                        <Typography variant="caption">{data?.currency.toLocaleUpperCase()}</Typography>
                        {tickerIcon}
                    </Stack>
                    <Typography variant="caption" paddingInline={1}>
                        Last Updated: {formatTime(data.timestamp)}
                    </Typography>
                </>
            )}
        </Stack>
    )
}
