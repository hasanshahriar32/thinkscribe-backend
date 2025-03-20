import Joi from 'joi';

const validator = {
  moduleSelect: {
    query: Joi.object({
      keyword: Joi.string().allow('').optional(),
      size: Joi.number().required(),
      page: Joi.number().required(),
      sort: Joi.string().optional(),
      order: Joi.string().valid('asc', 'desc').optional(),
    }),
  },
  moduleDetail: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
  moduleCreate: {
    body: Joi.object({
      name: Joi.string().required(),
    }),
  },
  moduleUpdate: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      name: Joi.string().required(),
    }),
  },
  moduleDelete: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
} as const;

export default validator;
