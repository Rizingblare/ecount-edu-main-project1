import * as popupHandler from '../../utils/popupHandler.js';
import * as prodEditHandler from './prodEditEventHandler.js';

document.addEventListener('DOMContentLoaded', function() {
    const pageState = popupHandler.initializePageState();
    prodEditHandler.init(pageState);
    
    if (pageState.hasQueryString) {
        registerSubmitEvent(true);
        registerDeleteEvent();
        registerResetEvent(true);
        registerCloseEvent();
    }

    else {
        registerSubmitEvent();
        registerResetEvent();
        registerCloseEvent();        
    }
})

function registerSubmitEvent(isEdit) {
    const submitBtn = document.querySelector('.submitBtn');
    if (!isEdit) {
        submitBtn.addEventListener('click', function() {
            prodEditHandler.addProdToStorage();
        });
    }
    else {
        submitBtn.addEventListener('click', function() {
            prodEditHandler.editProdToStorage();
        });
    }
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

function registerResetEvent(isEdit) {
    const resetBtn = document.querySelector('.resetBtn');
    resetBtn.addEventListener('click', function() {
        prodEditHandler.resetWindowForm(isEdit);
    });
}

function registerCloseEvent() {
    const closeBtn = document.querySelector('.closeBtn');
    closeBtn.addEventListener('click', function() {
        prodEditHandler.closeWindowPopup();
    });
}