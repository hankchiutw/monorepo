import { ColorInspector } from '@mono/color-inspector';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const dom = document.createElement('any-color-root');
document.body.insertAdjacentElement('afterbegin', dom);
ReactDOM.render(<ColorInspector />, dom);
