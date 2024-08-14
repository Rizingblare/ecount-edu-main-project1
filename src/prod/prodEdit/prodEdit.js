import * as popupHandler from '../../utils/popupHandler.js';
import * as prodEditHandler from './prodEditEventHandler.js';

document.addEventListener('DOMContentLoaded', function() {
    const pageState = popupHandler.initializePageState();
    prodEditHandler.init(pageState);
    
    registerSubmitEvent(pageState);
    registerResetEvent(pageState);

    if (pageState.hasQueryString) {
        registerDeleteEvent();
    }
    
    registerCloseEvent();
})

function registerSubmitEvent(pageState) {
    const submitBtn = document.querySelector('.submitBtn');
    submitBtn.textContent = pageState.hasQueryString ? '수정' : '등록';
    submitBtn.addEventListener('click', function() {
        prodEditHandler.submitProdToStorage(pageState);
    });
}

function registerResetEvent(pageState) {
    const resetBtn = document.querySelector('.resetBtn');
    resetBtn.addEventListener('click', function() {
        prodEditHandler.resetWindowForm(pageState);
    });
}

function registerDeleteEvent() {
    const deleteBtnArea = document.getElementById('deleteBtnArea');
    deleteBtnArea.innerHTML = `
        <button class="deleteBtn">삭제</button>
    `;

    const deleteBtn = document.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', function() {
        prodEditHandler.deleteProdFromStorage();
    });
}

function registerCloseEvent() {
    const closeBtn = document.querySelector('.closeBtn');
    closeBtn.addEventListener('click', function() {
        popupHandler.closePopup();
    });
}