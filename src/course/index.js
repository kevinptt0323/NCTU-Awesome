import { getBase64Image, currentPage, skip } from './util';

switch(currentPage()) {
  case "LOGIN":
    // login page
    document.getElementById('iframe1').addEventListener('load', function() {
      /*
      const $$img = this.contentDocument.getElementById('img');
      const b64 = getBase64Image($$img);
      const $$qCode = document.querySelector('input[name="qCode"]');
      $$qCode.value = recongize($$img);
      */
    });

    document.querySelector('input[type="submit"]').addEventListener('click', function() {
      const $$qCode = document.querySelector('input[name="qCode"]');
      //console.log($$qCode.value);
    });

    const $$ID = document.createElement('input');
    $$ID.setAttribute('type', 'text');
    $$ID.setAttribute('name', 'ID');
    $$ID.setAttribute('placeholder', '帳號');
    $$ID.setAttribute('tabindex', '1');

    const $$Pass = document.createElement('input');
    $$Pass.setAttribute('type', 'password');
    $$Pass.setAttribute('name', 'passwd');
    $$Pass.setAttribute('placeholder', '密碼');
    $$Pass.setAttribute('tabindex', '2');

    const $$qCode = document.createElement('input');
    $$qCode.setAttribute('type', 'text');
    $$qCode.setAttribute('name', 'qCode');
    $$qCode.setAttribute('placeholder', '驗證碼');
    $$qCode.setAttribute('tabindex', '3');

    const $$loginForm = document.createElement('div');
    $$loginForm.setAttribute('class', 'user-pass');
    $$loginForm.appendChild($$ID);
    $$loginForm.appendChild($$Pass);
    $$loginForm.appendChild($$qCode);

    const $$parent = document.querySelector('#tbl_login table').parentNode

    $$parent.removeChild($$parent.querySelector('input[name="qCode"]'));
    $$parent.removeChild($$parent.querySelector('font'));
    $$parent.replaceChild($$loginForm, document.querySelector('#tbl_login table'));
    break;
  case "SKIP":
    skip();
    break;
  case "MAIN":
    break;
}

console.log(currentPage());

