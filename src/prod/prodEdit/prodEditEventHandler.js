import * as utils from '../../utils/utils.js';
import * as localStorageHandler from '../../utils/localStorageHandler.js';

import * as config from '../../config/config.js';
import { ALERT_INPUT_MESSAGES } from '../../config/messageConstants.js';

export function init(pageState) {
    utils.allformsPreventSubmit();
    if (pageState.hasQueryString) {
        loadParams();
    }
}

export function loadParams() {
    const urlParams = window.location.search;
    const params = utils.parseURLParams(urlParams);

    const prodCodeInput = document.querySelector('input[name="prodCode"]');
    prodCodeInput.value = params["prodCode"];
    prodCodeInput.setAttribute('readonly', true);

    const prodNameInput = document.querySelector('input[name="prodName"]');
    prodNameInput.value = params["prodName"];
}

export function addProdToStorage() {
    const formData = new FormData(document.querySelector('form'));
    const prodCode = formData.get('prodCode');
    const prodName = formData.get('prodName');
    
    if (!prodCode.trim() || !prodName.trim()) {
        alert(ALERT_INPUT_MESSAGES.EMPTY_INPUT);
        return;
    }

    const newProd = {
        id: localStorageHandler.getNextId(),
        prodCode: prodCode,
        prodName: prodName
    };
    
    localStorageHandler.addToStorage(config.PROD_CONFIG.SECRET_KEY, newProd);
    closeWindowPopup();
}

export function editProdToStorage() {
    const formData = new FormData(document.querySelector('form'));
    const prodCode = formData.get('prodCode');
    const prodName = formData.get('prodName');

    if (!prodCode.trim() || !prodName.trim()) {
        alert(ALERT_INPUT_MESSAGES.EMPTY_INPUT);
        return;
    }

    localStorageHandler.updateInStorage(config.PROD_CONFIG.SECRET_KEY, 'prodCode', { proCode: prodCode, prodName: prodName });
    closeWindowPopup();
}

export function deleteProdFromStorage() {
    const params = utils.parseURLParams(window.location.search);
    localStorageHandler.deleteFromStorage(config.PROD_CONFIG.SECRET_KEY, 'prodCode');
    closeWindowPopup();
}

export function resetWindowForm(isEdit) {
    const prodCodeInput = document.querySelector('input[name="prodCode"]');
    prodCodeInput.value = '';

    const prodNameInput = document.querySelector('input[name="prodName"]');
    prodNameInput.value = '';

    if (isEdit) {
        loadParams();
    }
}

export function closeWindowPopup() {
    window.close();
    if (window.opener) window.opener.location.reload();
}