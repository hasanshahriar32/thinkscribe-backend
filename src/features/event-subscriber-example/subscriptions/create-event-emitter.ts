import { Knex } from 'knex';
import { eventBus } from '../../../events/event-bus';
import { createEventSubscriber } from '../event-subscriber.service';

eventBus.on(
  'create-event-emitter',
  async (payload: any, trx: Knex.Transaction) => {
    await createEventSubscriber(payload, trx);
  }
);
