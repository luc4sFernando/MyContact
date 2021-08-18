import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';
import './assets/css/notes.css';

import ValidaLogin from '../frontend/scripts/Login'

const login = new ValidaLogin('.login-form');
login.init()
