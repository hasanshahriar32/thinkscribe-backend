import Joi from 'joi';

const validator = {
  select: {
    query: Joi.object({
      keyword: Joi.string().allow('').optional(),
      size: Joi.number().required(),
      page: Joi.number().required(),
      sort: Joi.string().optional(),
      order: Joi.string().valid('asc', 'desc').optional(),
    }),
  },
  detail: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
  create: {
    body: Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
    }),
  },
  delete: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
} as const;

export default validator;
