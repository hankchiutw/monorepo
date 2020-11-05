import 'reflect-metadata';
import { chromex } from 'chromex';

chromex.contentScript = 'content.js';
chromex.injectOnCommands = ['toggle-inspector'];
chromex.injectOnClicked = true;

chromex.message.on('requestCapture', (p) => {
  console.log('xxx: requestCapture', p);
});
