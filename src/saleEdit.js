import * as saleEditHandler from './saleEditEventHandler.js';
import { MODE } from './constants/config.js';

document.addEventListener('DOMContentLoaded', function() {
    const mode = saleEditHandler.saleEditInit(window.location.search);

    if (mode === MODE.ADD_MODE) {
        registerSearchItemPopupEvent();
        registerMessageEvent();
        registerSubmitEvent();
        registerResetEvent();
        registerCloseEvent();
    }

    else if (mode === MODE.EDIT_MODE) {
        registerSearchItemPopupEvent();
        registerMessageEvent();
        registerSubmitEvent(true);
        registerDeleteEvent();
        registerResetEvent(true);
        registerCloseEvent();
    }
})

function registerSearchItemPopupEvent() {
    const searchItemBtn = document.getElementById('search-item-btn');
    
    searchItemBtn.addEventListener('click', function() {
        saleEditHandler.openSearchItemPopup();
    });

}

function registerMessageEvent() {
    window.addEventListener('message', function(event) {
        saleEditHandler.updateSelectedItems(event);
    });
}


function registerSubmitEvent(isEdit) {
    const submitBtn = document.querySelector('.submit-btn');
    if (!isEdit) {
        submitBtn.addEventListener('click', function() {
            saleEditHandler.addItemToStorage()
        });
    }
    else {
        submitBtn.addEventListener('click', function() {
            saleEditHandler.editItemToStorage();
        });
    }
}

function registerResetEvent(isEdit) {
    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', function() {
        saleEditHandler.resetSaleFormData();
    });
}

function registerDeleteEvent() {
    const deleteBtnArea = document.getElementById('delete-btn-area');
    deleteBtnArea.innerHTML = `
        <button class="delete-btn">삭제</button>
    `;

    const deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        saleEditHandler.deleteItemFromStorage();
    });
}

function registerCloseEvent() {
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', function() {
        saleEditHandler.closePopup();
    });
}
