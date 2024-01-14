import { Request, Response } from 'express'

import { getPrice } from '../services/price.service'

export async function get(req: Request, res: Response) {
    const response = await getPrice()

    res.status(200).json(response)
}
