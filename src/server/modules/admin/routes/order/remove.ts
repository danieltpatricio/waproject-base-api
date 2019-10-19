import { NextFunction, Request, Response } from 'express';

import * as orderService from '../../services/order';

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await orderService.remove(req.params.orderId);
    res.json();
  } catch (err) {
    next(err);
  }
}