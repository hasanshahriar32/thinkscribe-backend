import Joi from 'joi';

const validator = {
  select: {
    query: Joi.object({
      user_id: Joi.string().required(),
    }),
  },
  detail: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
  create: {
    body: Joi.object({
      channel_id: Joi.string().required(),
      module_id: Joi.string().required(),
      sub_module_id: Joi.string().required(),
      role_id: Joi.string().required(),
      action_id: Joi.string().required(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      channel_id: Joi.string().required(),
      module_id: Joi.string().required(),
      sub_module_id: Joi.string().required(),
      role_id: Joi.string().required(),
      actions: Joi.array().items(Joi.string()).required(),
    }),
  },
  delete: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
} as const;

export default validator;
