import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { blueGrey, green, red } from '@mui/material/colors'
import { useRef } from 'react'

type UseTrendParams = {
    price?: number
    isFetching: boolean
}

/**
 * infers trend based on current and previous prices and returns the
 * data required for price ticker
 */
export function useTrend({ price, isFetching }: UseTrendParams) {
    const prevPriceRef = useRef<number | undefined>()

    if (isFetching) {
        prevPriceRef.current = price
    }

    let tickerIcon: JSX.Element | null = null
    let tickerBackground: string = blueGrey[100]
    if (price && prevPriceRef.current) {
        if (price > prevPriceRef.current) {
            tickerBackground = green[100]
            tickerIcon = <ArrowUpwardIcon sx={{ alignSelf: 'flex-start' }} />
        }
        if (price < prevPriceRef.current) {
            tickerBackground = red[100]
            tickerIcon = <ArrowDownwardIcon sx={{ alignSelf: 'flex-start' }} />
        }
    }

    return { icon: tickerIcon, background: tickerBackground }
}
