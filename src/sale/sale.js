import * as saleEventHandler from './saleEventHandler.js';

document.addEventListener('DOMContentLoaded', function() {
    const hasOpener = saleEventHandler.init();
    registerSearchBtnEvent();
    registerItemSearchBtnEvent();
    registerAddBtnEvent();
    registerEditBtnEvent();
    registerIndividualCheckboxEvent();
    registerSelectAllCheckboxEvent();
    registerReceiveMessageEvent();
})


function registerSearchBtnEvent() {
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', function() {
        saleEventHandler.searchItemsByKeyword();
    });
}


function registerItemSearchBtnEvent() {
    const searchItemBtn = document.getElementById('search-item-btn');
    
    searchItemBtn.addEventListener('click', function() {
        saleEventHandler.openSearchItemPopup();
    });
}


function registerAddBtnEvent() {
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', function() {
        saleEventHandler.openPopup();
    });
}


function registerEditBtnEvent() {
    document.getElementById('main-list').addEventListener('click', function(event) {
        saleEventHandler.deliverClosestDatasetToPopup(event);
    });
}


function registerIndividualCheckboxEvent() {
    const checkboxes = document.querySelectorAll('#main-list .item-select input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            saleEventHandler.limitCheckboxSelection();
        });
    });
}


function registerSelectAllCheckboxEvent() {
    const selectAllCheckbox = document.getElementById('select-all');
    selectAllCheckbox.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('#main-list .item-select input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });
}


function registerReceiveMessageEvent() {
    window.addEventListener('message', function(event) {
        saleEventHandler.updateSelectedItems(event);
    });
}