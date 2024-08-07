import * as utils from './utils/utils.js';
import * as localStorageHandler from './utils/localStorageHandler.js';

import { ITEM_KEY, MODE } from './constants/config.js';
import { ALERT_INPUT_MESSAGES } from './constants/messageConstants.js';

export function itemEditInit(urlParams) {
    utils.allformsPreventSubmit();
    const mode = urlParams === '' ? MODE.ADD_MODE : MODE.EDIT_MODE;
    if (mode === MODE.EDIT_MODE) {
        loadParams(urlParams);
    }
    return mode;
}

export function loadParams(urlParams) {
    const params = utils.parseURLParams(urlParams);

    const itemCodeInput = document.querySelector('input[name="item-code"]');
    itemCodeInput.value = params["item-code"];
    itemCodeInput.setAttribute('readonly', true);

    const itemNameInput = document.querySelector('input[name="item-name"]');
    itemNameInput.value = params["item-name"];
}

export function addItemToStorage() {
    const formData = new FormData(document.querySelector('form'));
    const itemCode = formData.get('item-code');
    const itemName = formData.get('item-name');
    
    if (!itemCode.trim() || !itemName.trim()) {
        alert(ALERT_INPUT_MESSAGES.EMPTY_INPUT);
        return;
    }

    const newItem = {
        id: localStorageHandler.getNextId(),
        code: itemCode,
        name: itemName
    };
    
    localStorageHandler.addToStorage(ITEM_KEY, newItem);
    closeWindowPopup();
}

export function editItemToStorage() {
    const params = utils.parseURLParams();
    const itemId = params['item-id'];
    const formData = new FormData(document.querySelector('form'));
    const itemCode = formData.get('item-code');
    const itemName = formData.get('item-name');

    if (!itemCode.trim() || !itemName.trim()) {
        alert(ALERT_INPUT_MESSAGES.EMPTY_INPUT);
        return;
    }

    localStorageHandler.updateInStorage(ITEM_KEY, { id: parseInt(itemId, 10), code: itemCode, name: itemName });
    closeWindowPopup();
}

export function deleteItemFromStorage() {
    const params = utils.parseURLParams(window.location.search);
    localStorageHandler.deleteFromStorage(ITEM_KEY, params["item-id"]);
    closeWindowPopup();
}

export function resetWindowForm(isEdit, urlParams) {
    const itemCodeInput = document.querySelector('input[name="item-code"]');
    itemCodeInput.value = '';

    const itemNameInput = document.querySelector('input[name="item-name"]');
    itemNameInput.value = '';

    if (isEdit) {
        loadParams(urlParams);
    }
}

export function closeWindowPopup() {
    window.close();
    if (window.opener) window.opener.location.reload();
}