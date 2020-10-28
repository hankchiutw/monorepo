import './hot-reload';
import { injectable } from 'inversify';
import { MessageService } from '../module/message-service';
import { toPromise } from './to-promise';

@injectable()
export class Chromex {
  public injectOnCommands: string[] = [];
  public injectOnClicked = false;
  public contentScript: string;

  private injectedTabMap = {};

  constructor(private messageService: MessageService) {
    this.handleContentInjection();
  }

  /**
   * Inject the {@link contentScript} into the {@link tabId}.
   */
  private async inject(tabId: number): Promise<void> {
    if (this.injectedTabMap[tabId]) {
      return;
    }

    if (!this.contentScript || typeof this.contentScript !== 'string') {
      throw new Error(`Not a valid content script: ${this.contentScript}`);
    }

    return toPromise<void>(chrome.tabs.executeScript)(tabId, {
      file: this.contentScript,
    }).then(() => {
      this.injectedTabMap[tabId] = true;
    });
  }

  /**
   * Inject content script according to {@link injectOnClicked} and {@link injectOnCommands}.
   */
  private handleContentInjection() {
    chrome.browserAction.onClicked.addListener(({ id }) => {
      this.injectOnClicked && this.inject(id);
    });

    chrome.commands.onCommand.addListener(async (command: string) => {
      if (!Array.isArray(this.injectOnCommands)) {
        return;
      }
      if (this.injectOnCommands.includes(command)) {
        const tabId = await this.getActiveTabId();
        this.inject(tabId);
      }
    });
  }

  public async getActiveTabId(): Promise<number> {
    const tabs = await toPromise<chrome.tabs.Tab[]>(chrome.tabs.query)({
      active: true,
      currentWindow: true,
    });
    return tabs[0].id;
  }
}
