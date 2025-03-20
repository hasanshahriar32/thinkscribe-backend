import { Router } from 'express';
import {
  createOneChannel,
  deleteOneChannel,
  getAllChannels,
  getOneChannel,
  updateOneChannel,
} from './channel.controller';
import { validateRequest } from '../../middlewares/validation';
import validator from './channel.validator';

const channelRoutes = Router();

channelRoutes.get(
  '/channels',
  validateRequest(validator.select),
  getAllChannels
);
channelRoutes.get(
  '/channels/:id',
  validateRequest(validator.detail),
  getOneChannel
);
channelRoutes.post(
  '/channels',
  validateRequest(validator.create),
  createOneChannel
);
channelRoutes.patch(
  '/channels/:id',
  validateRequest(validator.update),
  updateOneChannel
);
channelRoutes.delete(
  '/channels/:id',
  validateRequest(validator.delete),
  deleteOneChannel
);

export default channelRoutes;
