import * as utils from '../../utils/utils.js';
import * as config from '../../config/config.js';
import * as popupHandler from '../../utils/popupHandler.js';
import * as localStorageHandler from '../../utils/localStorageHandler.js';


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

    const priceInput = document.querySelector('input[name="price"]');
    priceInput.value = params["price"];
}

export function submitProdToStorage(pageState) {
    const formData = new FormData(document.querySelector('form'));
    var prodEditInputDTO;
    if (pageState.hasQueryString) {
       prodEditInputDTO = {
            id: utils.getPrimaryKeyValueFromQueryString(config.PROD_CONFIG.PRIMARY_KEY),
            prodCode: formData.get('prodCode'),
            prodName: formData.get('prodName'),
            price: parseInt(formData.get('price'))
        };
        localStorageHandler.updateInStorage(config.PROD_CONFIG.SECRET_KEY, config.PROD_CONFIG.PRIMARY_KEY, prodEditInputDTO);
    }
    else {
        prodEditInputDTO = {
            id: localStorageHandler.getNextId(),
            prodCode: formData.get('prodCode'),
            prodName: formData.get('prodName'),
            price: parseInt(formData.get('price'))
        };
        localStorageHandler.addToStorage(config.PROD_CONFIG.SECRET_KEY, prodEditInputDTO);
    }
    popupHandler.closePopup();
}

export function deleteProdFromStorage() {
    const targetValue = utils.getPrimaryKeyValueFromQueryString(config.PROD_CONFIG.PRIMARY_KEY);
    localStorageHandler.deleteFromStorage(config.PROD_CONFIG.SECRET_KEY, config.PROD_CONFIG.PRIMARY_KEY, targetValue);
    popupHandler.closePopup();
}

export function resetProdFormData(pageState) {
    if (pageState.hasQueryString) {
        loadParams();
        return;
    }

    const prodCodeInput = document.querySelector('input[name="prodCode"]');
    prodCodeInput.value = '';

    const prodNameInput = document.querySelector('input[name="prodName"]');
    prodNameInput.value = '';
}