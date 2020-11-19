import 'reflect-metadata';
import { chromex } from 'chromex';
import { toPromise } from 'chromex-utils';
import { CapturedTab } from './models';

chromex.contentScript = 'content.js';
chromex.injectOnCommands = ['toggle-inspector'];
chromex.injectOnClicked = true;

const captureVisibleTab = async (): Promise<CapturedTab> => {
  const tabs = await toPromise<chrome.tabs.Tab[]>(chrome.tabs.query)({
    active: true,
    currentWindow: true,
  });
  const latestTab = tabs[0];
  const zoom: number = await toPromise<number>(chrome.tabs.getZoom)();
  const width = latestTab.width / zoom;
  const height = latestTab.height / zoom;

  const imgSrc = await toPromise<string>(chrome.tabs.captureVisibleTab)(null, {
    format: 'png',
  });

  const capturedTab = {
    imgSrc,
    width,
    height,
  };
  return capturedTab;
};

chromex.message.on('requestCapture', captureVisibleTab);

chrome.browserAction.onClicked.addListener(async () => {
  if (await chromex.isInjected()) {
    chromex.message.sendTab('toggleInspector');
  }
});

chrome.commands.onCommand.addListener(async (command: string) => {
  if (command === 'toggle-inspector') {
    if (await chromex.isInjected()) {
      chromex.message.sendTab('toggleInspector');
    }
  }
});
