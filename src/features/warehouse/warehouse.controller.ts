import { Request, Response } from 'express';
import { createWarehouse } from './warehouse.service';

export async function getAll(req: Request, res: Response) {
  try {
    await createWarehouse({ msg: 'lee pl' });
    res.send({ message: 'Sale recorded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing sale' });
  }
}
