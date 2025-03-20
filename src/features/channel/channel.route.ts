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
  validateRequest(validator.moduleSelect),
  getAllChannels
);
channelRoutes.get(
  '/channels/:id',
  validateRequest(validator.moduleDetail),
  getOneChannel
);
channelRoutes.post(
  '/channels',
  validateRequest(validator.moduleCreate),
  createOneChannel
);
channelRoutes.patch(
  '/channels/:id',
  validateRequest(validator.moduleUpdate),
  updateOneChannel
);
channelRoutes.delete(
  '/channels/:id',
  validateRequest(validator.moduleDelete),
  deleteOneChannel
);

export default channelRoutes;
