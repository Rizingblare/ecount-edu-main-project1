import * as utils from '../../utils/utils.js';
import * as localStorageHandler from '../../utils/localStorageHandler.js';

import { PROD_KEY, MODE } from '../../constants/config.js';
import { ALERT_INPUT_MESSAGES } from '../../constants/messageConstants.js';

export function init(urlParams) {
    utils.allformsPreventSubmit();
    const mode = urlParams === '' ? MODE.ADD_MODE : MODE.EDIT_MODE;
    if (mode === MODE.EDIT_MODE) {
        loadParams(urlParams);
    }
    return mode;
}

export function loadParams(urlParams) {
    const params = utils.parseURLParams(urlParams);

    const prodCodeInput = document.querySelector('input[name="prod-code"]');
    prodCodeInput.value = params["prod-code"];
    prodCodeInput.setAttribute('readonly', true);

    const prodNameInput = document.querySelector('input[name="prod-name"]');
    prodNameInput.value = params["prod-name"];
}

export function addProdToStorage() {
    const formData = new FormData(document.querySelector('form'));
    const prodCode = formData.get('prod-code');
    const prodName = formData.get('prod-name');
    
    if (!prodCode.trim() || !prodName.trim()) {
        alert(ALERT_INPUT_MESSAGES.EMPTY_INPUT);
        return;
    }

    const newProd = {
        id: localStorageHandler.getNextId(),
        code: prodCode,
        name: prodName
    };
    
    localStorageHandler.addToStorage(PROD_KEY, newProd);
    closeWindowPopup();
}

export function editProdToStorage() {
    const params = utils.parseURLParams();
    const prodId = params['prod-id'];
    const formData = new FormData(document.querySelector('form'));
    const prodCode = formData.get('prod-code');
    const prodName = formData.get('prod-name');

    if (!prodCode.trim() || !prodName.trim()) {
        alert(ALERT_INPUT_MESSAGES.EMPTY_INPUT);
        return;
    }

    localStorageHandler.updateInStorage(PROD_KEY, { id: parseInt(prodId, 10), code: prodCode, name: prodName });
    closeWindowPopup();
}

export function deleteProdFromStorage() {
    const params = utils.parseURLParams(window.location.search);
    localStorageHandler.deleteFromStorage(PROD_KEY, params["prod-id"]);
    closeWindowPopup();
}

export function resetWindowForm(isEdit, urlParams) {
    const prodCodeInput = document.querySelector('input[name="prod-code"]');
    prodCodeInput.value = '';

    const prodNameInput = document.querySelector('input[name="prod-name"]');
    prodNameInput.value = '';

    if (isEdit) {
        loadParams(urlParams);
    }
}

export function closeWindowPopup() {
    window.close();
    if (window.opener) window.opener.location.reload();
}