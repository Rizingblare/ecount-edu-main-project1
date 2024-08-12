import * as saleEventHandler from './saleEventHandler.js';
import * as checkboxHandler from '../utils/checkboxHandler.js';
import * as windowHandler from '../utils/windowHandler.js';

document.addEventListener('DOMContentLoaded', function() {
    const pageState = windowHandler.initializePageState();
    saleEventHandler.init();

    registerSearchBtnEvent();
    registerProdSearchBtnEvent();
    registerAddBtnEvent();
    registerEditBtnEvent();
    registerIndividualCheckboxEvent(pageState);
    registerSelectAllCheckboxEvent(pageState);
    registerReceiveMessageEvent();
})


function registerSearchBtnEvent() {
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', function() {
        saleEventHandler.searchProdsByKeyword();
    });
}


function registerProdSearchBtnEvent() {
    const searchProdBtn = document.getElementById('searchProdBtn');
    
    searchProdBtn.addEventListener('click', function() {
        saleEventHandler.openSearchProdPopup();
    });
}


function registerAddBtnEvent() {
    const addBtn = document.getElementById('addBtn');
    addBtn.addEventListener('click', function() {
        saleEventHandler.openPopup();
    });
}


function registerEditBtnEvent() {
    document.getElementById('mainList').addEventListener('click', function(event) {
        saleEventHandler.handleSaleEditPopupLink(event);
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


function registerSelectAllCheckboxEvent(pageState) {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    selectAllCheckbox.addEventListener('change', function() {
        checkboxHandler.changeStateOfAllCheckboxes(pageState);
    });
}


function registerReceiveMessageEvent() {
    window.addEventListener('message', function(event) {
        saleEventHandler.updateSelectedProds(event);
    });
}