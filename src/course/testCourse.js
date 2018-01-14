import $ from 'jquery';

(function(global) {
    const { HTMLDialogElement, CustomEvent } = global;
    const show = HTMLDialogElement.prototype.show;
    HTMLDialogElement.prototype.show = function() {
        show.apply(this, arguments);
        const openEvent = new CustomEvent('open', {
            bubbles: false,
            cancelable: false
        });
        this.dispatchEvent(openEvent);
    };

    const showModal = HTMLDialogElement.prototype.showModal;
    HTMLDialogElement.prototype.showModal = function() {
        showModal.apply(this, arguments);
        const openEvent = new CustomEvent('open', {
            bubbles: false,
            cancelable: false
        });
        this.dispatchEvent(openEvent);
    };
})(window);

class TestCourse {
    constructor() {
    }
    init() {
        const query = this.initQueryCourse();
        this.initSelectedCourse();
        this.initButtons(query);

        $('.mdl-dialog')
            .on('open', () => {
                $('body').addClass('no-scroll');
            })
            .on('close', () => {
                $('body').removeClass('no-scroll');
            })
            .on('click', '.close', e => {
                e.delegateTarget.close();
            });
        if (query)
            $('#dialog__query-course')[0].showModal();
    }
    initQueryCourse() {
        if (!document.getElementById('divCrsList'))
            return false;
        let $dialog = $(`
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
    initSelectedCourse() {
        let $dialog = $(`
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
    initButtons(query) {
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
        $buttons.find('button[data-target]').on('click', function() {
            const target = $(this).data('target');
            $(target)[0].showModal();
        });
        $('body').prepend($buttons);
    }
}

const testCourse = new TestCourse();

testCourse.init();
