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
    break;
  case "SKIP":
    skip();
    break;
  case "MAIN":
    break;
}

console.log(currentPage());

