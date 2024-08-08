import * as itemEditHandler from './itemEditEventHandler.js';

import { MODE } from '../constants/config.js';

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = window.location.search;
    const mode = itemEditHandler.init(urlParams);
    
    if (mode === MODE.ADD_MODE) {
        registerSubmitEvent();
        registerResetEvent();
        registerCloseEvent();
    }

    else if (mode === MODE.EDIT_MODE) {
        registerSubmitEvent(true);
        registerDeleteEvent();
        registerResetEvent(true);
        registerCloseEvent();
    }
})

function registerSubmitEvent(isEdit) {
    const submitBtn = document.querySelector('.submit-btn');
    if (!isEdit) {
        submitBtn.addEventListener('click', function() {
            itemEditHandler.addItemToStorage();
        });
    }
    else {
        submitBtn.addEventListener('click', function() {
            itemEditHandler.editItemToStorage();
        });
    }
}


function registerDeleteEvent() {
    const deleteBtnArea = document.getElementById('delete-btn-area');
    deleteBtnArea.innerHTML = `
        <button class="delete-btn">삭제</button>
    `;

    const deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        itemEditHandler.deleteItemFromStorage();
    });
}

function registerResetEvent(isEdit) {
    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', function() {
        itemEditHandler.resetWindowForm(isEdit, window.location.search);
    });
}

function registerCloseEvent() {
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', function() {
        itemEditHandler.closeWindowPopup();
    });
}