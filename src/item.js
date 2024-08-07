import * as itemHandler from './itemEventHandler.js';

document.addEventListener('DOMContentLoaded', function() {
    itemHandler.itemInit();
    registerSearchEvent();
    registerAddPopupEvent();
    registerEditPopupEvent();
    registerIndividualCheckboxEvent();
    registerSelectAllEvent();
    registerSubmitEvent();
})

function registerSearchEvent() {
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', function() {
        itemHandler.searchItemsByKeyword();
    });
}

function registerAddPopupEvent() {
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', function() {
        itemHandler.openPopup();
    });
}

function registerEditPopupEvent() {
    document.getElementById('item-list').addEventListener('click', function(event) {
        itemHandler.openEditPopup(event);
    });
}

function registerSelectAllEvent() {
    const selectAllCheckbox = document.getElementById('select-all');
    selectAllCheckbox.addEventListener('click', function() {
        itemHandler.changeStateOfAllCheckboxes(selectAllCheckbox.checked);
    });
}

function registerIndividualCheckboxEvent() {
    const checkboxes = document.querySelectorAll('#item-list .item-select input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            itemHandler.limitCheckboxSelection();
        });
    });
}

function registerSubmitEvent() {
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', function() {
        itemHandler.submitItems();
    });
}
