import { App } from './app/app';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const dom = document.createElement('any-color-root');
document.body.insertAdjacentElement('afterbegin', dom);
ReactDOM.render(<App />, dom);
