import { eventBus } from '../../events/event-bus';

eventBus.on('create-sale', (saleData) => {
  console.log('done', saleData);
});

export async function createWarehouse(saleData: { msg: string }) {
  eventBus.emit('hehe', 'creaetd sale');
}
