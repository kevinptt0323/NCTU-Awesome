import $ from 'jquery';

(function injectHTMLDialogElementPrototype(global) {
    const { HTMLDialogElement, CustomEvent } = global;
    const { show, showModal } = HTMLDialogElement.prototype;
    HTMLDialogElement.prototype.show = function _show(...args) {
        show.apply(this, args);
        const openEvent = new CustomEvent('open', {
            bubbles: false,
            cancelable: false,
        });
        this.dispatchEvent(openEvent);
    };

    HTMLDialogElement.prototype.showModal = function _showModal(...args) {
        showModal.apply(this, args);
        const openEvent = new CustomEvent('open', {
            bubbles: false,
            cancelable: false,
        });
        this.dispatchEvent(openEvent);
    };
}(window));

class TestCourse {
    static init() {
        const query = TestCourse.initQueryCourse();
        TestCourse.initSelectedCourse();
        TestCourse.initButtons(query);

        $('.mdl-dialog')
            .on('open', () => {
                $('body').addClass('no-scroll');
            })
            .on('close', () => {
                $('body').removeClass('no-scroll');
            })
            .on('click', '.close', (e) => {
                e.delegateTarget.close();
            });
        if (query) {
            $('#dialog__query-course')[0].showModal();
        }
    }
    static initQueryCourse() {
        if (!document.getElementById('divCrsList')) {
            return false;
        }
        const $dialog = $(`
<dialog class="mdl-dialog" id="dialog__query-course">
    <h4 class="mdl-dialog__title">課程查詢</h4>
    <div class="mdl-dialog__content">
    </div>
    <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button close">關閉</button>
    </div>
</dialog>
        `);

        const $tbl = $('#divCrsList').removeAttr('style');
        $tbl.find('table').removeAttr('width');

        $dialog.children('.mdl-dialog__content').append($tbl);
        $('body').append($dialog);
        $('#btnDivCrsList').remove();
        return true;
    }
    static initSelectedCourse() {
        const $dialog = $(`
<dialog class="mdl-dialog" id="dialog__selected-course">
    <h4 class="mdl-dialog__title">已選課程</h4>
    <div class="mdl-dialog__content">
    </div>
    <div class="mdl-dialog__actions">
        <button type="button" class="mdl-button close">關閉</button>
    </div>
</dialog>
        `);

        const $tbl = $('#divTestList').removeAttr('style');
        $tbl.find('table').removeAttr('width');

        $dialog.children('.mdl-dialog__content').append($tbl);
        $('body').append($dialog);
        $('#btnDivTestList').remove();
        return true;
    }
    static initButtons(query) {
        const $buttons = $(`
<div id="buttons">
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
        ${query ? '' : 'disabled'}
        data-target="#dialog__query-course">
        顯示課程查詢
    </button>
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
        data-target="#dialog__selected-course">
        顯示已選課程
    </button>
</div>
        `);
        $buttons.find('button[data-target]').on('click', function onclick() {
            const target = $(this).data('target');
            $(target)[0].showModal();
        });
        $('body').prepend($buttons);
    }
}

TestCourse.init();
