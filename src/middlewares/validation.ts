import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

interface ValidationSchemas {
  body?: Schema;
  query?: Schema;
  params?: Schema;
}

export const validateRequest = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Validate body
    if (schemas.body) {
      const { error } = schemas.body.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
    }

    // Validate query
    if (schemas.query) {
      const { error } = schemas.query.validate(req.query);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
    }

    // Validate params
    if (schemas.params) {
      const { error } = schemas.params.validate(req.params);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
    }

    next();
  };
};
