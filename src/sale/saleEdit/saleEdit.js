import * as config from '../../config/config.js';
import * as selectedProdHandler from '../../prod/selectedProdHandler.js';
import * as popupHandler from '../../utils/popupHandler.js';
import * as saleEditHandler from './saleEditEventHandler.js';

document.addEventListener('DOMContentLoaded', function() {
    const pageState = popupHandler.initializePageState();
    saleEditHandler.init(pageState);
    
    registerSearchProdPopupEvent();
    registerMessageEvent();
    registerSubmitEvent(pageState);
    registerResetEvent(pageState);
    
    if (pageState.hasQueryString) {
        registerDeleteEvent();
    }
    
    registerCloseEvent();
})

function registerSearchProdPopupEvent() {
    const searchProdBtn = document.getElementById('searchProdBtn');
    
    searchProdBtn.addEventListener('click', function() {
        popupHandler.openPopup(config.URL.PROD);
    });

}

function registerMessageEvent() {
    window.addEventListener('message', function(event) {
        selectedProdHandler.updateSelectedProds(event);
    });
}

function registerSubmitEvent(pageState) {
    const submitBtn = document.querySelector('.submitBtn');
    submitBtn.textContent = pageState.hasQueryString ? '수정' : '등록';
    submitBtn.addEventListener('click', function() {
        saleEditHandler.submitSaleToStorage(pageState);
    });
}

function registerResetEvent(pageState) {
    const resetBtn = document.querySelector('.resetBtn');
    resetBtn.addEventListener('click', function() {
        saleEditHandler.resetSaleFormData(pageState);
    });
}

function registerDeleteEvent() {
    const deleteBtnArea = document.getElementById('deleteBtnArea');
    deleteBtnArea.innerHTML = `
        <button class="deleteBtn">삭제</button>
    `;

    const deleteBtn = document.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', function() {
        saleEditHandler.deleteSaleFromStorage();
    });
}

function registerCloseEvent() {
    const closeBtn = document.querySelector('.closeBtn');
    closeBtn.addEventListener('click', function() {
        popupHandler.closePopup();
    });
}