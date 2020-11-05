import 'reflect-metadata';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app/app';

const dom = document.createElement('any-color-root');
document.body.insertAdjacentElement('afterbegin', dom);
ReactDOM.render(<App />, dom);
