import * as itemHandler from './itemEventHandler.js';

document.addEventListener('DOMContentLoaded', function() {
    itemHandler.init();
    registerSearchBtnEvent();
    registerAddBtnEvent();
    registerRowClickEvent();
    registerIndividualCheckboxEvent();
    registerSelectAllCheckBoxEvent();
    registerSubmitBtnEvent();
})

function registerSearchBtnEvent() {
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', function() {
        itemHandler.searchItemsByKeyword();
    });
}

function registerAddBtnEvent() {
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', function() {
        itemHandler.openItemEditPopup();
    });
}

function registerRowClickEvent() {
    document.getElementById('main-list').addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('select-link')) {
            itemHandler.handleItemSelectLink(target);
        }
        
        else if (target.classList.contains('edit-link')) {
            itemHandler.handleItemEditPopupLink(event);
        }
    });
}

function registerSelectAllCheckBoxEvent() {
    const selectAllCheckbox = document.getElementById('select-all');
    selectAllCheckbox.addEventListener('click', function() {
        itemHandler.changeStateOfAllCheckboxes(selectAllCheckbox.checked);
    });
}

function registerIndividualCheckboxEvent() {
    const checkboxes = document.querySelectorAll('#main-list .item-select input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            itemHandler.limitCheckboxSelection();
        });
    });
}

function registerSubmitBtnEvent() {
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', function() {
        itemHandler.submitItems();
    });
}
