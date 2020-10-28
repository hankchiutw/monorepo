import 'reflect-metadata';
import { chromex } from 'chromex';

chromex.contentScript = 'content.js';
chromex.injectOnCommands = ['toggle-inspector'];
chromex.injectOnClicked = true;
