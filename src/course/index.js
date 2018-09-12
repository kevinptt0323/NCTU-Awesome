import componentHandler from 'componentHandler';
import { currentPage, skip } from './util';
import Login from './login';
import Homepage from './homepage';

const login = new Login();

switch (currentPage()) {
case 'LOGIN':
  login.init();
  break;
case 'SKIP':
  skip();
  break;
case 'MAIN':
  Homepage.init();
  break;
default:
  break;
}

componentHandler.upgradeAllRegistered();
