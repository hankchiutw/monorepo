import { MessageService } from 'chromex-utils';
import { Container } from 'inversify';
import { Chromex } from './lib/chromex';

const container = new Container({ defaultScope: 'Singleton' });
container.bind<MessageService>(MessageService).toSelf();
container.bind<Chromex>(Chromex).toSelf();
const chromex = container.resolve<Chromex>(Chromex);

export { container, chromex };
