import * as windowHandler from '../utils/windowHandler.js';
import * as prodHandler from './prodEventHandler.js';
import * as checkboxHandler from '../utils/checkboxHandler.js';

document.addEventListener('DOMContentLoaded', function() {
    const pageState = windowHandler.initializePageState();
    prodHandler.init(pageState);
    
    if (pageState.hasOpener) {
        registerSubmitBtnEvent();
    }

    registerSearchBtnEvent();
    registerAddBtnEvent();
    registerItemLinkClickEvent();
    registerIndividualCheckboxEvent(pageState);
    registerSelectAllCheckboxEvent(pageState);
})

function registerSearchBtnEvent() {
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', function() {
        prodHandler.searchProdsByKeyword();
    });
}

function registerAddBtnEvent() {
    const addBtn = document.getElementById('addBtn');
    addBtn.addEventListener('click', function() {
        prodHandler.openProdEditPopup();
    });
}

function registerItemLinkClickEvent() {
    document.getElementById('mainList').addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('selectLink')) {
            prodHandler.submitProdItemByLink(target);
        }
        
        else if (target.classList.contains('editLink')) {
            prodHandler.handleProdEditPopupLink(event);
        }
    });
}

function registerSelectAllCheckboxEvent(pageState) {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    selectAllCheckbox.addEventListener('click', function() {
        checkboxHandler.changeStateOfAllCheckboxes(pageState);
    });
}

function registerIndividualCheckboxEvent(pageState) {
    const checkboxes = document.querySelectorAll('#mainList .selectIndividualCheckbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            checkboxHandler.limitCheckboxSelection(pageState);
        });
    });
}

function registerSubmitBtnEvent() {
    const submitBtnArea = document.getElementById('submitBtnArea');
    submitBtnArea.innerHTML = `
        <button class="submitBtn">제출</button>
    `;
    const submitBtn = document.querySelector('.submitBtn');
    submitBtn.addEventListener('click', function() {
        prodHandler.submitProdItemsByBtn();
    });
}
