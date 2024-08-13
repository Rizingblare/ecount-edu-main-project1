import * as config from '../config/config.js';
import * as popupHandler from '../utils/popupHandler.js';
import * as checkboxHandler from '../utils/checkboxHandler.js';

import * as prodHandler from './prodEventHandler.js';
import * as selectedProdHandler from './selectedProdHandler.js';

document.addEventListener('DOMContentLoaded', function() {
    const pageState = popupHandler.initializePageState();
    prodHandler.init(pageState);
    
    if (pageState.hasOpener) {
        registerSubmitBtnEvent();
        registerCloseEvent();
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
        popupHandler.openPopup(config.URL.PROD_EDIT);
    });
}

function registerItemLinkClickEvent() {
    document.getElementById('mainList').addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('selectLink')) {
            selectedProdHandler.submitProdItemByLink(target);
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
        selectedProdHandler.submitProdItemsByBtn();
    });
}

function registerCloseEvent() {
    const closeBtnArea = document.getElementById('closeBtnArea');
    closeBtnArea.innerHTML = `
        <button class="closeBtn">닫기</button>
    `;
    const closeBtn = document.querySelector('.closeBtn');
    closeBtn.addEventListener('click', function() {
        popupHandler.closePopup();
    });
}