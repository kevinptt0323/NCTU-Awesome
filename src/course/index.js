import { getBase64Image, currentPage, skip } from './util';

switch(currentPage()) {
  case "LOGIN":
    // login page
    
    const $loginForm = $.parseHTML(`
<div id="login_form" class="mdl-color--white mdl-shadow--2dp mdl-grid">
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--12-col">
    <input class="mdl-textfield__input" type="text" name="ID" id="ID" tabindex="1">
    <label class="mdl-textfield__label" for="ID">帳號</label>
  </div>
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--12-col">
    <input class="mdl-textfield__input" type="password" name="passwd" id="passwd" tabindex="2">
    <label class="mdl-textfield__label" for="passwd">密碼</label>
  </div>
  <div class="mdl-cell--12-col">
    <iframe id="iframe1" src="getSafeCode.asp"></iframe>
  </div>
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell--12-col">
    <input class="mdl-textfield__input" type="text" name="qCode" id="qCode" tabindex="3">
    <label class="mdl-textfield__label" for="qCode">驗證碼</label>
  </div>
  <div class="mdl-cell--12-col">
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" type="submit">
      登入
    </button>
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="reset">
      清除
    </button>
  </div>
  <div class="mdl-cell--12-col">
    <a class="mdl-button mdl-js-button mdl-js-ripple-effect" href="/getPW.asp">
      忘記密碼
    </a>
  </div>
</div>
    `);

    const $announcement = $.parseHTML(`
<div class="mdl-color--white mdl-shadow--2dp mdl-grid">
  <div class="mdl-cell--12-col">
    <ul>
      <li><a href="en/index.asp" target="_top">Enter Online Course Registration System</a></li>
      <li>帳號=學號，密碼=舊生請仍延用上學期密碼，新生請用身分證後六碼（研究所新生若已暑修，密碼與暑修同）</li>
      <li><a href="https://cross-college.nctu.edu.tw/" target="_blank">校際選課系統</a>(For 外校生)</li>
      <li><a href="https://summercourse.nctu.edu.tw/" target="_blank">暑修選課系統</a></li>
      <li><a href="/CRManage" target="_blank">教室借用系統</a></li>
      <li>若有任何疑問：<ul>
        <li><a href="http://aadm.nctu.edu.tw/chcourse/" target="_blank">課務組首頁</a></li>
        <li>Email：<a href="mailto:chcourse@cc.nctu.edu.tw">chcourse@cc.nctu.edu.tw</a></li>
        <li>電話：(03)5712121 # 50421~50424</li>
      </ul></li>
    </ul>
  </div>
</div>
    `)

    $('form > div').remove();
    $('form').prepend($loginForm, $announcement);
    break;
  case "SKIP":
    skip();
    break;
  case "MAIN":
    break;
}

componentHandler.upgradeAllRegistered();

