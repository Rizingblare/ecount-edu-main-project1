import * as saleEditHandler from './saleEditEventHandler.js';
import { MODE } from '../../constants/config.js';

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = window.location.search;
    const mode = saleEditHandler.init(urlParams);
    
    if (mode === MODE.ADD_MODE) {
        registerSearchProdPopupEvent();
        registerMessageEvent();
        registerSubmitEvent();
        registerResetEvent();
        registerCloseEvent();
    }

    else if (mode === MODE.EDIT_MODE) {
        registerSearchProdPopupEvent();
        registerMessageEvent();
        registerSubmitEvent(true);
        registerDeleteEvent();
        registerResetEvent(true);
        registerCloseEvent();
    }
})

function registerSearchProdPopupEvent() {
    const searchProdBtn = document.getElementById('search-prod-btn');
    
    searchProdBtn.addEventListener('click', function() {
        saleEditHandler.openSearchProdPopup();
    });

}

function registerMessageEvent() {
    window.addEventListener('message', function(event) {
        saleEditHandler.updateSelectedProds(event);
    });
}


function registerSubmitEvent(isEdit) {
    const submitBtn = document.querySelector('.submit-btn');
    if (!isEdit) {
        submitBtn.addEventListener('click', function() {
            saleEditHandler.addProdToStorage()
        });
    }
    else {
        submitBtn.addEventListener('click', function() {
            saleEditHandler.editProdToStorage();
        });
    }
}

function registerResetEvent(isEdit) {
    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', function() {
        saleEditHandler.resetSaleFormData(isEdit);
    });
}

function registerDeleteEvent() {
    const deleteBtnArea = document.getElementById('delete-btn-area');
    deleteBtnArea.innerHTML = `
        <button class="delete-btn">삭제</button>
    `;

    const deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        saleEditHandler.deleteProdFromStorage();
    });
}

function registerCloseEvent() {
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', function() {
        saleEditHandler.closePopup();
    });
}
