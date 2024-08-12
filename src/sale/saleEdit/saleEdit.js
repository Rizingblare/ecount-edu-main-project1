import * as config from '../../constants/config.js';
import * as saleEditHandler from './saleEditEventHandler.js';

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = window.location.search;
    const mode = saleEditHandler.init(urlParams);
    
    if (mode === config.MODE.ADD) {
        registerSearchProdPopupEvent();
        registerMessageEvent();
        registerSubmitEvent();
        registerResetEvent();
        registerCloseEvent();
    }

    else if (mode === config.MODE.EDIT) {
        registerSearchProdPopupEvent();
        registerMessageEvent();
        registerSubmitEvent(true);
        registerDeleteEvent();
        registerResetEvent(true);
        registerCloseEvent();
    }
})

function registerSearchProdPopupEvent() {
    const searchProdBtn = document.getElementById('searchProdBtn');
    
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
    const submitBtn = document.querySelector('.submitBtn');
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
    const resetBtn = document.querySelector('.resetBtn');
    resetBtn.addEventListener('click', function() {
        saleEditHandler.resetSaleFormData(isEdit);
    });
}

function registerDeleteEvent() {
    const deleteBtnArea = document.getElementById('deleteBtnArea');
    deleteBtnArea.innerHTML = `
        <button class="deleteBtn">삭제</button>
    `;

    const deleteBtn = document.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', function() {
        saleEditHandler.deleteProdFromStorage();
    });
}

function registerCloseEvent() {
    const closeBtn = document.querySelector('.closeBtn');
    closeBtn.addEventListener('click', function() {
        saleEditHandler.closePopup();
    });
}
