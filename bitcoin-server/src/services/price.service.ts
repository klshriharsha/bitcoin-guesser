export async function getPrice() {
    let curPrice
    try {
        curPrice = await realPrice()
    } catch (e) {
        console.log(e)
        console.log('falling back to fake api')
        curPrice = await fakePrice()
    }

    return { timestamp: curPrice.timestamp, price: +curPrice.price.toFixed(2), currency: 'usd' }
}

let price = 45800
async function fakePrice(): Promise<RealPrice> {
    const shouldChange = Math.random() > 0.3
    if (shouldChange) {
        const sign = Math.random() > 0.5 ? -1 : 1
        price = price + Math.random() * 10 * sign
    }

    return new Promise(resolve => {
        setTimeout(
            () => {
                resolve({ price, timestamp: Math.floor(Date.now() / 1000) })
            },
            Math.floor(Math.random() * 1000),
        )
    })
}

type RealPrice = {
    price: number
    timestamp: number
}

async function realPrice(): Promise<RealPrice> {
    const apiKey = process.env.API_KEY ?? ''

    return fetch('https://api.api-ninjas.com/v1/cryptoprice?symbol=BTCUSDC', { headers: { 'X-Api-Key': apiKey } })
        .then(res => res.json() as Promise<RealPrice>)
        .then(res => ({ timestamp: res.timestamp, price: +res.price }))
}
