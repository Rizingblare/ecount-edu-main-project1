import * as prodHandler from './prodEventHandler.js';

document.addEventListener('DOMContentLoaded', function() {
    prodHandler.init();
    registerSearchBtnEvent();
    registerAddBtnEvent();
    registerRowClickEvent();
    registerIndividualCheckboxEvent();
    registerSelectAllCheckboxEvent();
    registerSubmitBtnEvent();
})

function registerSearchBtnEvent() {
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', function() {
        prodHandler.searchProdsByKeyword();
    });
}

function registerAddBtnEvent() {
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', function() {
        prodHandler.openProdEditPopup();
    });
}

function registerRowClickEvent() {
    document.getElementById('main-list').addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('select-link')) {
            prodHandler.handleProdSelectLink(target);
        }
        
        else if (target.classList.contains('edit-link')) {
            prodHandler.handleProdEditPopupLink(event);
        }
    });
}

function registerSelectAllCheckboxEvent() {
    const selectAllCheckbox = document.getElementById('select-all');
    selectAllCheckbox.addEventListener('click', function() {
        prodHandler.changeStateOfAllCheckboxes(selectAllCheckbox.checked);
    });
}

function registerIndividualCheckboxEvent() {
    const checkboxes = document.querySelectorAll('#main-list .prod-select input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            prodHandler.limitCheckboxSelection();
        });
    });
}

function registerSubmitBtnEvent() {
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', function() {
        prodHandler.submitProds();
    });
}
