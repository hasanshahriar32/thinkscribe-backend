import { eventBus } from '../../../events/event-bus';

eventBus.on('create-sale-order', (saleData) => {
  console.log('done', saleData);
});

eventBus.on('create-purchase-order', (saleData) => {
  console.log('done', saleData);
});

eventBus.on('create-purchase-order', (saleData) => {
  console.log('done', saleData);
});
