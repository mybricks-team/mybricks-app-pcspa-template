import '@/reset.less';

import { render } from 'react-dom'

import App from './App';
import React from 'react';

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('groupId') || '';

render(<App options={{ type: 'group', id }} />, document.getElementById('root'))