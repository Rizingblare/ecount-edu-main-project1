import * as config from '../config/config.js';
import * as popupHandler from '../utils/popupHandler.js';
import * as checkboxHandler from '../utils/checkboxHandler.js';
import * as saleEventHandler from './saleEventHandler.js';
import * as selectedProdHandler from '../prod/selectedProdHandler.js';

document.addEventListener('DOMContentLoaded', function() {
    const pageState = popupHandler.initializePageState();
    saleEventHandler.init();

    registerSearchBtnEvent();
    registerProdSearchBtnEvent();
    registerAddBtnEvent();
    registerEditBtnEvent();
    registerIndividualCheckboxEvent(pageState);
    registerSelectAllCheckboxEvent(pageState);
    registerReceiveMessageEvent();
    registerMainPageBtnEvent();
})


function registerSearchBtnEvent() {
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', function() {
        saleEventHandler.searchSalesByKeyword();
    });
}


function registerProdSearchBtnEvent() {
    const searchProdBtn = document.getElementById('searchProdBtn');
    
    searchProdBtn.addEventListener('click', function() {
        popupHandler.openPopup(config.URL.PROD);
    });
}


function registerAddBtnEvent() {
    const addBtn = document.getElementById('addBtn');
    addBtn.addEventListener('click', function() {
        popupHandler.openPopup(config.URL.SALE_EDIT);
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
        selectedProdHandler.updateSelectedProds(event);
    });
}

function registerMainPageBtnEvent() {
    const mainPageBtn = document.getElementById('mainPageBtn');
    mainPageBtn.addEventListener('click', function() {
        window.location.href = config.URL.MAIN;
    });
}