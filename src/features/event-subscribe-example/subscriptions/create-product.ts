import { eventBus } from '../../../events/event-bus';

eventBus.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
