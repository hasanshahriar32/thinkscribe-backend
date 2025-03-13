import { Request, Response } from 'express';

export async function login(req: Request, res: Response) {
  try {
    // get one user

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

export async function refreshToken(req: Request, res: Response) {
  try {
    res.send({ message: 'Signup successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing sale' });
  }
}
