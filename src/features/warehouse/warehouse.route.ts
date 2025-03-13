import { Router } from 'express';
import { getAll } from './warehouse.controller';

const warehouseRoutes = Router();

warehouseRoutes.get('/warehouses', getAll);

export default warehouseRoutes;
