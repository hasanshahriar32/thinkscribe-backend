import { NextFunction, Request, Response } from 'express';
import { getUser } from './auth.service';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    // get one user
    const user = await getUser(req.body.username);

    // throw err if no user

    // verify password

    // throw err if wrong password

    // generate access token

    // generate refresh token

    res.send({ message: 'Signup successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing sale' });
  }
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.send({ message: 'Signup successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing sale' });
  }
}
