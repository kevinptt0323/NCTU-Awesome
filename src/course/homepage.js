import $ from 'jquery';

export default class Homepage {
  static init() {
    Homepage.initPage();

    document.querySelector('iframe[name="frmTitle"]').onload = () => {
      const u = Homepage.getUserData();

      $('#app header .mdl-layout-title')
        .html(`國立交通大學選課系統 - ${u.name} (${u.department} ${u.semester})`);

      $('iframe[name="frmTitle"]').remove();
    };

    document.querySelector('iframe[name="frmMenu"]').onload = () => {
      const nav = Homepage.getNavData();
      Homepage.initNav(nav);
      $('iframe[name="frmMenu"]').remove();
    };
  }
  static initPage() {
    $('frameset').remove();
    document.body = document.createElement('body');

    const $content = $(`
<div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <a class="mdl-layout-title mdl-color-text--white" href="inHelp.asp">Title</a>
      <div class="mdl-layout-spacer"></div>
      <nav class="mdl-navigation mdl-layout--large-screen-only">
        <a class="mdl-navigation__link" href="testCourse/testCourse.asp" target="frmMain">預排功課表</a>
      </nav>
    </div>
  </header>
  <main class="mdl-layout__content">
    <div class="nav mdl-shadow--4dp">
      <iframe src="inMenu.asp" name="frmMenu"></iframe>
    </div>
    <div class="container">
      <iframe name="frmMain" src="inHelp.asp"></iframe>
    </div>
  </main>
  <iframe src="inTitle.asp" name="frmTitle"></iframe>
  <form method="POST" target="frmMain" id="frmAction">
    <input type="hidden" name="qAction">
    <input type="hidden" name="qKey">
    <input type="hidden" name="qAcy">
    <input type="hidden" name="qSemester">
  </form>
</div>
    `);

    $('body').append($content);
  }
  static getUserData() {
    const $$profile = $('iframe[name="frmTitle"]')[0]
      .contentDocument.getElementsByTagName('td');

    const job = $$profile[1].innerText;
    const name = $$profile[3].innerText;
    const department = $$profile[5].innerText;
    const semester = $$profile[6].innerText;
    return {
      job, name, department, semester,
    };
  }
  static getNavData() {
    const $$nav = $('iframe[name="frmMenu"]')[0]
      .contentDocument.querySelector('div[align="left"] > center')
      .querySelectorAll('.TRHeader td, div');
    const nav = [];
    for (let i = 0; i < $$nav.length; i++) {
      if ($$nav[i].tagName.toLowerCase() === 'td') {
        const item = {
          title: $$nav[i].textContent,
          href: '',
        };
        if (i + 1 < $$nav.length
          && $$nav[i + 1].tagName.toLowerCase() === 'div') {
          const $$items = $$nav[i + 1].querySelectorAll('td a');
          item.items = [...$$items].map(dom => ({
            title: dom.textContent,
            href: dom.getAttribute('href'),
            target: dom.getAttribute('target'),
            onclick: dom.getAttribute('onclick'),
          }));
        } else {
          const $$a = $$nav[i].querySelector('a');
          item.href = $$a.getAttribute('href');
          item.target = $$a.getAttribute('target');
        }
        nav.push(item);
      }
    }
    return nav;
  }
  static initNav(nav) {
    const $nav = $(Homepage.createNavHTML(nav));

    $('.nav').append($nav);
    Homepage.addNavEvt($nav);
  }
  static createNavHTML(nav, parId = '0') {
    const navHTML = nav.map(({
      items, title, href, target,
    }, index) => {
      const ret = `
<li
  class='mdl-list__item${items ? ' mdl-list__item-submenu' : ''}'
  ${items ? `style='--item-num: ${items.length}'` : ''}
  >
  ${items ? `
    <span class="mdl-list__item-primary-content">
      <span>${title}</span>
    </span>
    <a class="mdl-list__item-secondary-action">
      <i class="material-icons">keyboard_arrow_right</i>
    </a>
    ${Homepage.createNavHTML(items, `${parId}-${index}`)}
  ` : `
    <a
      id="nav-${parId}-${index}"
      class="mdl-list__item-primary-content"
      href="${href}"
      target="${target}"
    >
      ${title}
    </a>
  `}
</li>
`;
      return ret;
    });
    return `
<ul class="mdl-list"> ${navHTML.join('')} </ul>
`;
  }

  static addNavEvt($nav) {
    $nav.find('.mdl-list__item-submenu').click(function onclick(e) {
      if (!$(this).find('.mdl-list')[0].contains(e.target)) {
        $(this).toggleClass('sub-open');
      }
    });
    $nav.find('#nav-0-0-0').click((e) => {
      e.preventDefault();
      return Homepage.SetfrmAction('adMain.asp', '加選');
    });
    $nav.find('#nav-0-0-1').click((e) => {
      e.preventDefault();
      return Homepage.SetfrmAction('adNow.asp', '退選');
    });
    $nav.find('#nav-0-2-0').click((e) => {
      e.preventDefault();
      return Homepage.SetfrmAction('adNow.asp', '選課狀況');
    });
    $nav.find('#nav-0-7-0').click((e) => {
      e.preventDefault();
      return Homepage.SetfrmAction('upwd.asp', '更改密碼');
    });
    $nav.find('#nav-0-7-1').click((e) => {
      e.preventDefault();
      return Homepage.SetfrmAction('pemail.asp', '更改信箱');
    });
  }

  static SetfrmAction(url, qAction, qKey, qAcy, qSeme) {
    const frmAction = document.getElementById('frmAction');
    frmAction.action = url;
    frmAction.qAction.value = qAction;
    if (qKey === '?') {
      const qCrsno = prompt('加入欲審核課號', '');
      if (qCrsno == null || qCrsno === '' || qCrsno.length !== 4) {
        return false;
      }
      document.frmAction.qKey.value = qCrsno;
    } else {
      frmAction.qKey.value = qKey;
    }
    frmAction.qAcy.value = qAcy;
    frmAction.qSemester.value = qSeme;
    frmAction.submit();
    return false;
  }
}
