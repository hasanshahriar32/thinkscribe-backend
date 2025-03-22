import { Router } from 'express';
import {
  createChannels,
  createOneChannel,
  deleteChannels,
  deleteOneChannel,
  getAllChannels,
  getOneChannel,
  softDeleteChannels,
  softDeleteOneChannel,
  updateOneChannel,
} from './channel.controller';
import { validateRequest } from '../../../middlewares/validation';
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
  '/channels/create',
  validateRequest(validator.create),
  createOneChannel
);
channelRoutes.post(
  '/channels/create-multi',
  validateRequest(validator.createMulti),
  createChannels
);
channelRoutes.patch(
  '/channels/update/:id',
  validateRequest(validator.update),
  updateOneChannel
);
channelRoutes.delete(
  '/channels/delete/:id',
  validateRequest(validator.delete),
  deleteOneChannel
);
channelRoutes.post(
  '/channels/delete-multi',
  validateRequest(validator.deleteMulti),
  deleteChannels
);
channelRoutes.delete(
  '/channels/soft-delete/:id',
  validateRequest(validator.delete),
  softDeleteOneChannel
);
channelRoutes.post(
  '/channels/soft-delete-multi',
  validateRequest(validator.deleteMulti),
  softDeleteChannels
);

export default channelRoutes;
