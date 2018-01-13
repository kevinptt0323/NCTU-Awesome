const $content = $.parseHTML(`
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <span class="mdl-layout-title">Title</span>
      <div class="mdl-layout-spacer"></div>
      <nav class="mdl-navigation mdl-layout--large-screen-only">
        <a class="mdl-navigation__link" href="">Link</a>
        <a class="mdl-navigation__link" href="">Link</a>
        <a class="mdl-navigation__link" href="">Link</a>
        <a class="mdl-navigation__link" href="">Link</a>
      </nav>
    </div>
  </header>
  <div class="mdl-layout__drawer">
  </div>
  <main class="mdl-layout__content">
    <iframe name="frmMain" src="inHelp.asp"></iframe>
  </main>
</div>
`);

$('body').append($content);

console.log($('div[align="left"]'));

$('div[align="left"]').appendTo('.mdl-layout__drawer');

componentHandler.upgradeAllRegistered();
