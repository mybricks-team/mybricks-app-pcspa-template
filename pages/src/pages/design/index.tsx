import React from 'react'
import {render} from 'react-dom'

import axios from 'axios'

import '@/reset.less'

axios.defaults.withCredentials = true

import App from './app'

render(<App />, document.getElementById('root'))
