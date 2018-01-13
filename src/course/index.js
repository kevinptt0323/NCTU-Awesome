import componentHandler from 'componentHandler'
import { currentPage, skip } from './util';
import Login from './login';
import Homepage from './homepage';

const login = new Login();
const homepage = new Homepage();

switch(currentPage()) {
case "LOGIN":
    login.init();
    break;
case "SKIP":
    skip();
    break;
case "MAIN":
    homepage.init();
    break;
}

componentHandler.upgradeAllRegistered();
